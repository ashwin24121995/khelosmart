// Storage helpers - placeholder for future implementation
// This project does not require file storage functionality

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  throw new Error("Storage functionality not implemented. Configure your own S3 or cloud storage.");
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  throw new Error("Storage functionality not implemented. Configure your own S3 or cloud storage.");
}
