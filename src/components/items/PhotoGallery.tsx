"use client";

import { useState } from "react";
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Expand,
  Images,
} from "lucide-react";

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export function PhotoGallery({
  photos,
  color,
  text,
  onOpenLightbox,
}: {
  photos: Photo[];
  color: string;
  text: string;
  onOpenLightbox: (index: number) => void;
}) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <div
        className="h-64 flex items-center justify-center"
        style={{ background: `${color}50` }}
      >
        <div
          className="w-20 h-20 rounded-[28px] flex items-center justify-center"
          style={{ background: color }}
        >
          <Package className="w-10 h-10" style={{ color: text }} />
        </div>
      </div>
    );
  }

  const prev = () => setActive((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setActive((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <div className="relative select-none">
      <div
        className="relative h-72 sm:h-80 overflow-hidden bg-black/5 cursor-zoom-in"
        onClick={() => onOpenLightbox(active)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={photos[active].src}
          alt={photos[active].alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white/80 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 pointer-events-none">
          <Expand className="w-3 h-3" /> View full
        </div>
        <div className="absolute top-3 left-3 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
            <Images className="w-3 h-3 text-white/70" />
            <span className="text-[11px] font-bold text-white/80">
              {photos.length} photo{photos.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex items-center gap-2 px-5 py-4 overflow-x-auto bg-[#F7F4F0]/60 border-t border-black/5">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === active ? "border-[#111010] scale-105 shadow-md" : "border-transparent opacity-50 hover:opacity-80 hover:scale-105"}`}
              aria-label={`Photo ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all ${i === active ? "w-4 h-1.5 bg-[#111010]" : "w-1.5 h-1.5 bg-black/20"}`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
