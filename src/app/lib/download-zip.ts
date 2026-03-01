import JSZip from "jszip";

const getFileNameFromUrl = (url: string, index: number) => {
  try {
    const parsedUrl = new URL(url);
    const lastSegment = parsedUrl.pathname.split("/").pop();
    if (lastSegment && lastSegment.includes(".")) {
      return decodeURIComponent(lastSegment);
    }
  } catch {
  }

  return `photo-${index + 1}.jpg`;
};

export const downloadImagesAsZip = async (
  imageUrls: string[],
  zipFileName: string
) => {
  const zip = new JSZip();

  await Promise.all(
    imageUrls.map(async (imageUrl, index) => {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        return;
      }

      const blob = await response.blob();
      const fileName = `${String(index + 1).padStart(2, "0")}-${getFileNameFromUrl(
        imageUrl,
        index
      )}`;
      zip.file(fileName, blob);
    })
  );

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = zipFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
};