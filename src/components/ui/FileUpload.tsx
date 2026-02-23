"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, File, AlertCircle, CheckCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: "uploading" | "done" | "error";
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  maxFiles?: number;
  label?: string;
  hint?: string;
  error?: string;
  /** Called with new File objects when user selects/drops */
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

// ─── FileUpload ───────────────────────────────────────────────────────────────

export function FileUpload({
  accept = "image/*",
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10 MB
  maxFiles = 5,
  label,
  hint,
  error: externalError,
  onFilesChange,
  className = "",
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = (file: File) => file.type.startsWith("image/");

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null);
      const arr = Array.from(newFiles);

      if (files.length + arr.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed.`);
        return;
      }

      const valid: UploadedFile[] = [];
      for (const f of arr) {
        if (f.size > maxSize) {
          setError(`"${f.name}" exceeds the ${formatBytes(maxSize)} limit.`);
          continue;
        }
        const id = Math.random().toString(36).slice(2);
        const preview = isImage(f) ? URL.createObjectURL(f) : undefined;
        valid.push({ id, file: f, preview, status: "uploading", progress: 0 });
      }

      setFiles((prev) => [...prev, ...valid]);
      onFilesChange?.(valid.map((v) => v.file));

      // Simulate upload progress
      valid.forEach(({ id }) => {
        let p = 0;
        const iv = setInterval(() => {
          p += Math.random() * 25;
          if (p >= 100) {
            p = 100;
            clearInterval(iv);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === id ? { ...f, status: "done", progress: 100 } : f,
              ),
            );
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === id ? { ...f, progress: Math.min(p, 99) } : f,
              ),
            );
          }
        }, 120);
      });
    },
    [files.length, maxFiles, maxSize, onFilesChange],
  );

  const remove = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const displayError = externalError ?? error;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label && (
        <p className="text-[13px] font-semibold text-[#111010]/70">{label}</p>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload files"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-3
          px-6 py-10 rounded-2xl border-2 border-dashed cursor-pointer
          transition-all duration-200 group outline-none
          focus-visible:ring-4 focus-visible:ring-[#7EB3F7]/20
          ${
            dragging
              ? "border-[#7EB3F7] bg-[#C8DFFE]/10 scale-[1.01]"
              : displayError
                ? "border-red-300 bg-red-50/30 hover:border-red-400"
                : "border-black/10 bg-[#F7F4F0]/50 hover:border-black/20 hover:bg-[#F7F4F0]"
          }
        `}
      >
        <div
          className={`
          w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200
          ${dragging ? "bg-[#C8DFFE] text-[#3B7FD4]" : "bg-white border border-black/8 text-black/30 group-hover:text-black/50"}
        `}
        >
          <Upload className="w-5 h-5" />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-semibold text-[#111010]">
            {dragging ? "Drop to upload" : "Click or drag files here"}
          </p>
          <p className="text-[12px] text-black/35 font-medium mt-1">
            {hint ??
              `${accept.replace("*", "files")} · max ${formatBytes(maxSize)} each · up to ${maxFiles} files`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* Error */}
      {displayError && (
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-red-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {displayError}
        </p>
      )}

      {/* File previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((f) => (
            <FileCard key={f.id} file={f} onRemove={() => remove(f.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── File card ────────────────────────────────────────────────────────────────

function FileCard({
  file,
  onRemove,
}: {
  file: UploadedFile;
  onRemove: () => void;
}) {
  return (
    <div className="relative group rounded-2xl border border-black/6 bg-white overflow-hidden shadow-sm">
      {/* Preview or icon */}
      <div className="aspect-square bg-[#F7F4F0] flex items-center justify-center overflow-hidden relative">
        {file.preview ? (
          <Image
            src={file.preview}
            alt={file.file.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <File className="w-8 h-8 text-black/15" />
        )}
      </div>

      {/* Progress overlay */}
      {file.status === "uploading" && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-[#F7F4F0] border-t-[#111010] animate-spin" />
          <p className="text-[11px] font-bold text-[#111010]">
            {Math.round(file.progress ?? 0)}%
          </p>
        </div>
      )}

      {/* Done badge */}
      {file.status === "done" && (
        <div className="absolute top-2 left-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
          <CheckCircle className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
        aria-label="Remove file"
      >
        <X className="w-3 h-3 text-white" />
      </button>

      {/* Name */}
      <div className="px-3 py-2 border-t border-black/5">
        <p className="text-[11px] font-semibold text-[#111010] truncate">
          {file.file.name}
        </p>
        <p className="text-[10px] text-black/30 font-medium">
          {formatBytes(file.file.size)}
        </p>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
