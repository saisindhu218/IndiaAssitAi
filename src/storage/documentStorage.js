// Stores Document Locker files locally on the device instead of in Firebase
// Storage. Firebase Storage now requires the paid Blaze plan even for small
// usage, so this keeps the whole app on free tiers.
//
// Trade-off: documents live only on this device -- they won't sync across
// phones and are lost if the app is uninstalled. Firestore still stores the
// document's metadata (name, type, local path), so the list of documents
// is driven from the same place as before; only the file bytes moved.

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

function documentsDir(uid) {
  return `${FileSystem.documentDirectory}documents/${uid}/`;
}

/**
 * Copy a picked file (from expo-image-picker or expo-document-picker) into
 * this app's persistent local storage. Returns a local file URI that can be
 * saved in Firestore and reopened later.
 */
export async function uploadUserDocument(uid, fileUri, fileName) {
  const dir = documentsDir(uid);
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {});

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const destUri = `${dir}${Date.now()}_${safeName}`;

  await FileSystem.copyAsync({ from: fileUri, to: destUri });

  // "storagePath" and "url" are the same thing here (a local file:// URI) --
  // kept as two fields so the rest of the app (Firestore schema, UI) didn't
  // need to change when this moved from Firebase Storage to local storage.
  return { url: destUri, storagePath: destUri };
}

export async function deleteUserDocumentFile(storagePath) {
  try {
    await FileSystem.deleteAsync(storagePath, { idempotent: true });
  } catch (e) {
    console.warn("Could not delete local file (continuing anyway):", e.message);
  }
}

/**
 * "Download" a locally-stored document -- since it's already on the device,
 * this opens the native share sheet, which lets the user save it to Files/
 * Photos, print it, send it elsewhere, etc.
 */
export async function openUserDocument(fileUri) {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error("Sharing isn't available on this device.");
  }
  await Sharing.shareAsync(fileUri);
}
