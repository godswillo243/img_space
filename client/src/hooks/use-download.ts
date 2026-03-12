import { useState } from "react";

export function useImageDownload() {
  const [loading, setLoading] = useState(false);

  const download = async (imageUrl: string, fileName: string = "image.png") => {
    setLoading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { download, loading };
}
