import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Download } from "react-feather";
import Image from "next/image";

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = useCallback(
    () => setCurr((c) => (c === 0 ? slides.length - 1 : c - 1)),
    [slides.length]
  );
  const next = useCallback(
    () => setCurr((c) => (c === slides.length - 1 ? 0 : c + 1)),
    [slides.length]
  );

  const getFileName = useCallback((url: string, fallbackIndex: number) => {
    try {
      const parsedUrl = new URL(url);
      const lastSegment = parsedUrl.pathname.split("/").pop();
      if (lastSegment && lastSegment.includes(".")) {
        return decodeURIComponent(lastSegment);
      }
    } catch {
    }

    return `event-photo-${fallbackIndex + 1}.jpg`;
  }, []);

  const downloadCurrentSlide = useCallback(async () => {
    const imageUrl = slides[curr];
    const fileName = getFileName(imageUrl, curr);

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
      return;
    } catch {
    }

    const fallbackLink = document.createElement("a");
    fallbackLink.href = imageUrl;
    fallbackLink.download = fileName;
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    fallbackLink.remove();
  }, [curr, getFileName, slides]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-[10px] shadow-md">
      <div
        className="flex h-full transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img, index) => (
          <button
            key={index}
            type="button"
            className="relative w-full flex-shrink-0"
            onClick={next}
            aria-label={`View next image from slide ${index + 1}`}
          >
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <button
        onClick={prev}
        className="p-1 absolute top-1/2 left-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10"
        aria-label="Previous image"
        title="Previous image"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={next}
        className="p-1 absolute top-1/2 right-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10"
        aria-label="Next image"
        title="Next image"
      >
        <ChevronRight size={30} />
      </button>
      <button
        type="button"
        onClick={downloadCurrentSlide}
        className="absolute top-3 right-3 z-10 rounded-md bg-black/60 p-2 text-white hover:bg-black/75"
        aria-label="Download current image"
      >
        <Download size={16} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              type="button"
              onClick={() => setCurr(i)}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
              key={i}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
