"use client";

import { useCallback, useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageViewerImage {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ImageViewerProps {
  images: ImageViewerImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

// ─── Public component ─────────────────────────────────────────────────────────
// Re-mounts the inner viewer when `open` flips or `initialIndex` changes,
// so useState() initializers run fresh — no setState-in-effect needed.

export function ImageViewer(props: ImageViewerProps) {
  const { open, initialIndex = 0 } = props;
  if (!open || props.images.length === 0) return null;
  return (
    <ImageViewerInner
      key={`${open ? "open" : "closed"}-${initialIndex}`}
      {...props}
      initialIndex={initialIndex}
    />
  );
}

// ─── Inner component ──────────────────────────────────────────────────────────

function ImageViewerInner({
  images,
  initialIndex = 0,
  onClose,
}: ImageViewerProps) {
  const [index, setIndex] = useState(initialIndex);
  // zoom/pan reset whenever index changes — handled by a keyed ZoomLayer below
  const [dragging, setDragging] = useState(false);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <span className="text-[13px] font-semibold text-white/40">
          {index + 1} / {images.length}
        </span>

        <div className="flex items-center gap-2">
          {/* Zoom is handled inside ZoomLayer */}
          <div className="w-px h-5 bg-white/10 mx-1" />
          <ControlBtn
            onClick={() => window.open(img.src, "_blank")}
            label="Download"
          >
            <Download className="w-4 h-4" />
          </ControlBtn>
          <ControlBtn onClick={onClose} label="Close">
            <X className="w-4 h-4" />
          </ControlBtn>
        </div>
      </div>

      {/* Main image area — keyed on index so zoom/pan state resets on nav */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 z-10 w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 z-10 w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <ZoomLayer
          key={index}
          img={img}
          dragging={dragging}
          setDragging={setDragging}
        />
      </div>

      {/* Caption + thumbnails */}
      <div className="shrink-0 px-6 pb-6 space-y-4">
        {img.caption && (
          <p className="text-center text-[13px] font-medium text-white/50">
            {img.caption}
          </p>
        )}

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {images.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  w-12 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0
                  ${i === index ? "border-white scale-110 shadow-lg" : "border-white/10 opacity-50 hover:opacity-80"}
                `}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb.src}
                  alt={thumb.alt ?? ""}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>
    </div>
  );
}

// ─── ZoomLayer — re-mounts on index change, so zoom/pan start fresh ───────────

function ZoomLayer({
  img,
  dragging,
  setDragging,
}: {
  img: ImageViewerImage;
  dragging: boolean;
  setDragging: (v: boolean) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const zoomOut = () => {
    setZoom((z) => {
      const nz = Math.max(z - 0.5, 1);
      if (nz === 1) setPan({ x: 0, y: 0 });
      return nz;
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setDragging(false);

  return (
    <div
      className="flex-1 flex items-center justify-center w-full h-full"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default",
      }}
    >
      {/* Zoom controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        <ControlBtn onClick={zoomOut} disabled={zoom <= 1} label="Zoom out">
          <ZoomOut className="w-4 h-4" />
        </ControlBtn>
        <span className="text-[12px] font-bold text-white/40 w-10 text-center tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
        <ControlBtn onClick={zoomIn} disabled={zoom >= 4} label="Zoom in">
          <ZoomIn className="w-4 h-4" />
        </ControlBtn>
      </div>

      <div
        style={{
          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          transition: dragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt ?? ""}
          className="max-w-[90vw] max-h-[75vh] rounded-xl object-contain select-none shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );
}

function ControlBtn({
  onClick,
  disabled = false,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10 disabled:opacity-30 disabled:pointer-events-none"
    >
      {children}
    </button>
  );
}
