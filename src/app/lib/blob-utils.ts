import { put, list, del } from "@vercel/blob";

/**
 * Upload a file to Vercel Blob
 * @param file - File object or Buffer
 * @param filename - Name for the file in blob storage
 * @param folder - Optional folder path (e.g. "images" or "videos")
 * @returns The public URL of the uploaded file
 */

export async function uploadToBlob(
    file: File | Buffer,
    filename: string,
    folder?: string
): Promise<string> {
    const path = folder ? `${folder}/${filename}` : filename;
    const blob = await put(path, file, { access: "public" });

    return blob.url;
}

/**
 * Get the public URL for a file in Vercel Blob
 * @param path - The path to the file in blob storage (e.g. "images/logo.png")
 * @returns The public URL of the file
 */
export async function getBlobUrl(path: string): Promise<string> {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BLOB_BASE_URL is not set");
    }

    return `${baseUrl}/${cleanPath}`;
}

/**
 * List all files in a folder
 */
export async function listBlobFiles(folder?: string) {
    const { blobs } = await list({
        prefix: folder,
    });
    return blobs;
}

/**
 * Delete a file from Vercel Blob
 */
export async function deleteBlobFile(path: string) {
    await del(path);
}
