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

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

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

/**
 * Copy a picked file (from expo-image-picker or expo-document-picker) into
 * this app's persistent local storage. Returns the relative path, which is
 * saved in Firestore and reopened later with resolveDocumentUri().
 */
export async function uploadUserDocument(uid, fileUri, fileName) {
  const dir = documentsDir(uid);
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {});

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storedName = `${Date.now()}_${safeName}`;

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

/**
 * "Download" a locally-stored document -- since it's already on the device,
 * this opens the native share sheet, which lets the user save it to Files/
 * Photos, print it, send it elsewhere, etc.
 *
 * The file is first copied to the cache folder because the share sheet can
 * always read that location, unlike the app's private documents folder.
 */
export async function openUserDocument(stored) {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error("Sharing isn't available on this device.");
  }

  const uri = resolveDocumentUri(stored);
  const info = uri ? await FileSystem.getInfoAsync(uri) : { exists: false };
  if (!info.exists) throw new Error(MISSING_FILE_MESSAGE);

  const fileName = uri.split("/").pop() || "document";
  const cacheUri = `${FileSystem.cacheDirectory}share_${fileName}`;
  await FileSystem.deleteAsync(cacheUri, { idempotent: true }).catch(() => {});
  await FileSystem.copyAsync({ from: uri, to: cacheUri });

  const extension = fileName.includes(".") ? fileName.split(".").pop().toLowerCase() : "";
  try {
    await Sharing.shareAsync(cacheUri, {
      mimeType: MIME_TYPES[extension],
      dialogTitle: "Share or save document",
    });
  } finally {
    // tidy up the temporary copy a little later (the share sheet may still be reading it)
    setTimeout(() => {
      FileSystem.deleteAsync(cacheUri, { idempotent: true }).catch(() => {});
    }, 120000);
  }
}
