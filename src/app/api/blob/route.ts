import { list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to list files in Vercel Blob
 * GET /api/blob?folder=images
 */

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const folder = searchParams.get("folder") || undefined;

        const { blobs } = await list({
            prefix: folder,
        });

        return NextResponse.json({
            files: blobs.map((blob) => ({
                url: blob.url,
                pathname: blob.pathname,
                size: blob.size,
            })),
        });
    } catch (error) {
        console.error("Error listing blobs: ", error);
        return NextResponse.json(
            { error: "Failed to list files" },
            { status: 500 }
        );
    }
}
