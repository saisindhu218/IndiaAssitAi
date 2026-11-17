// Stores Document Locker files locally on the device instead of in Firebase
// Storage. Firebase Storage now requires the paid Blaze plan even for small
// usage, so this keeps the whole app on free tiers.
//
// Trade-off: documents live only on this device -- they won't sync across
// phones and are lost if the app is uninstalled. Firestore still stores the
// document's metadata (name, type, local path), so the list of documents
// is driven from the same place as before; only the file bytes moved.
//
// Paths are stored RELATIVE to the app's documents folder
// ("documents/<uid>/<file>") and turned into a full address only when used.
// A full address contains this app's private folder name, which can change
// (for example between Expo Go versions), and then the phone refuses to read
// the file. Older entries saved as full addresses are converted automatically.

import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";

export const MISSING_FILE_MESSAGE =
  "This file isn't on this phone any more. Documents are kept only on the phone where you added them -- " +
  "they are lost after uninstalling the app, or if the app's storage changed. Please add the document again.";

const MIME_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
  pdf: "application/pdf",
};

// Work out a file extension: from the name, else from the picked file's address,
// else from the kind of file the picker told us it was.
function pickExtension(fileName, fileUri, fileType) {
  const fromText = (text) => {
    const clean = String(text || "").split("?")[0];
    const dot = clean.lastIndexOf(".");
    const ext = dot > -1 ? clean.slice(dot + 1).toLowerCase() : "";
    return MIME_TYPES[ext] ? ext : "";
  };
  return fromText(fileName) || fromText(fileUri) || (fileType === "pdf" ? "pdf" : "jpg");
}

// For files saved without an extension (older uploads): recognise the type
// from the first bytes of the file.
async function sniffExtension(uri) {
  try {
    const head = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
      position: 0,
      length: 16,
    });
    if (head.startsWith("iVBORw0K")) return "png";
    if (head.startsWith("/9j/")) return "jpg";
    if (head.startsWith("JVBER")) return "pdf";
    if (head.startsWith("R0lGOD")) return "gif";
    if (head.startsWith("UklGR")) return "webp";
  } catch (e) {
    // fall through
  }
  return "";
}

function documentsDir(uid) {
  return `${FileSystem.documentDirectory}documents/${uid}/`;
}

/**
 * Full file address for a stored path. Accepts the new relative form
 * ("documents/<uid>/<file>") and older full "file://..." addresses.
 */
export function resolveDocumentUri(stored) {
  if (!stored) return null;
  let relative = stored;
  if (/^file:\/\//.test(stored)) {
    const marker = stored.lastIndexOf("/documents/");
    if (marker === -1) return stored; // unknown location -- use as it is
    relative = stored.slice(marker + 1); // "documents/<uid>/<file>"
  }
  return FileSystem.documentDirectory + relative.replace(/^\/+/, "");
}

// Last-resort copy for files the normal copy refuses to read (some pickers give
// addresses the file system won't open directly): read the bytes and write them.
async function copyViaFetch(fromUri, toUri) {
  const response = await fetch(fromUri);
  const blob = await response.blob();
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onloadend = () => {
      const result = String(reader.result || "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(blob);
  });
  await FileSystem.writeAsStringAsync(toUri, base64, { encoding: FileSystem.EncodingType.Base64 });
}

/**
 * Immediately copies a freshly picked file into this app's own temporary
 * folder, BEFORE the person types a name. Picker files can live in places the
 * app isn't allowed to read later (this caused "Location ... isn't readable"
 * errors in Expo Go), so we grab a copy while we still have access.
 * Returns the address of the temporary copy.
 */
export async function stagePickedFile(sourceUri, fileName, fileType) {
  const folder = `${FileSystem.cacheDirectory}pending/`;
  await FileSystem.makeDirectoryAsync(folder, { intermediates: true }).catch(() => {});
  const extension = pickExtension(fileName, sourceUri, fileType);
  const staged = `${folder}${Date.now()}.${extension}`;
  try {
    await FileSystem.copyAsync({ from: sourceUri, to: staged });
  } catch (firstError) {
    try {
      await copyViaFetch(sourceUri, staged);
    } catch (secondError) {
      throw new Error(
        "Couldn't read that file. Try picking it again, or pick a different file. (" + firstError.message + ")"
      );
    }
  }
  return staged;
}

/** Deletes a temporary copy made by stagePickedFile (ignores anything else). */
export async function discardStagedFile(uri) {
  if (uri && uri.includes("/pending/")) {
    await FileSystem.deleteAsync(uri, { idempotent: true }).catch(() => {});
  }
}

/**
 * Copy a picked file (from expo-image-picker or expo-document-picker) into
 * this app's persistent local storage. Returns the relative path, which is
 * saved in Firestore and reopened later with resolveDocumentUri().
 */
export async function uploadUserDocument(uid, fileUri, fileName, fileType) {
  const dir = documentsDir(uid);
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {});

  const extension = pickExtension(fileName, fileUri, fileType);
  const base = fileName.replace(/\.[a-zA-Z0-9]{2,5}$/, ""); // avoid "name.jpg.jpg"
  const safeBase = base.replace(/[^a-zA-Z0-9._-]/g, "_") || "document";
  const storedName = `${Date.now()}_${safeBase}.${extension}`; // always ends with a real extension

  await FileSystem.copyAsync({ from: fileUri, to: `${dir}${storedName}` });

  // "storagePath" and "url" hold the same value -- kept as two fields so the
  // rest of the app (Firestore schema, UI) didn't need to change.
  const relative = `documents/${uid}/${storedName}`;
  return { url: relative, storagePath: relative };
}

export async function deleteUserDocumentFile(storagePath) {
  try {
    const uri = resolveDocumentUri(storagePath);
    if (uri) await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (e) {
    console.warn("Could not delete local file (continuing anyway):", e.message);
  }
}

// Makes a temporary, correctly-named copy of a stored document that other apps
// (share sheet, PDF viewer) are allowed to read. Returns { cacheUri, folder, extension }.
async function prepareExternalCopy(stored, displayName, fileTypeHint) {
  const uri = resolveDocumentUri(stored);
  const info = uri ? await FileSystem.getInfoAsync(uri) : { exists: false };
  if (!info.exists) throw new Error(MISSING_FILE_MESSAGE);

  const storedName = uri.split("/").pop() || "document";
  const dot = storedName.lastIndexOf(".");
  let extension = dot > -1 ? storedName.slice(dot + 1).toLowerCase() : "";
  if (!MIME_TYPES[extension]) {
    extension = (await sniffExtension(uri)) || (fileTypeHint === "pdf" ? "pdf" : "jpg");
  }

  const niceBase = String(displayName || "")
    .replace(/\.[a-zA-Z0-9]{2,5}$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/^_+|_+$/g, "");
  const shareName = `${niceBase || "document"}.${extension}`;

  const folder = `${FileSystem.cacheDirectory}share_${Date.now()}/`;
  await FileSystem.makeDirectoryAsync(folder, { intermediates: true }).catch(() => {});
  const cacheUri = `${folder}${shareName}`;
  await FileSystem.copyAsync({ from: uri, to: cacheUri });
  return { cacheUri, folder, extension };
}

function cleanUpLater(folder) {
  // the other app may still be reading the copy, so wait a while
  setTimeout(() => {
    FileSystem.deleteAsync(folder, { idempotent: true }).catch(() => {});
  }, 120000);
}

/**
 * Share / save a stored document: opens the phone's share sheet, so it can be
 * sent to WhatsApp, saved to Files, printed, etc.
 */
export async function openUserDocument(stored, displayName, fileTypeHint) {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error("Sharing isn't available on this device.");
  }
  const { cacheUri, folder, extension } = await prepareExternalCopy(stored, displayName, fileTypeHint);
  try {
    await Sharing.shareAsync(cacheUri, {
      mimeType: MIME_TYPES[extension],
      dialogTitle: "Share or save document",
    });
  } finally {
    cleanUpLater(folder);
  }
}

export const NO_VIEWER_CODE = "NO_PDF_VIEWER";

/**
 * Open a PDF to READ it, in the phone's own PDF viewer (Google Drive PDF
 * Viewer, Adobe, the browser, ...). If the phone has no PDF viewer app, it
 * throws an error with code NO_PDF_VIEWER so the screen can offer to share
 * the file instead. (iOS has no direct equivalent here, so it uses the
 * share sheet, which includes a preview.)
 */
export async function viewUserPdf(stored, displayName) {
  if (Platform.OS !== "android") {
    return openUserDocument(stored, displayName, "pdf");
  }
  const { cacheUri, folder } = await prepareExternalCopy(stored, displayName, "pdf");
  try {
    const contentUri = await FileSystem.getContentUriAsync(cacheUri);
    await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      data: contentUri,
      flags: 1, // FLAG_GRANT_READ_URI_PERMISSION: lets the viewer read this one file
      type: "application/pdf",
    });
  } catch (e) {
    const error = new Error(
      "No PDF viewer app was found on this phone. You can install one (for example Google Drive or Adobe Acrobat), or share/save the file instead."
    );
    error.code = NO_VIEWER_CODE;
    error.cause = e;
    throw error;
  } finally {
    cleanUpLater(folder);
  }
}
