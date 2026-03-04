"use client";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Package,
  CheckCircle,
  ArrowRight,
  Share2,
  AlertCircle,
  User,
  Calendar,
  Tag,
  Images,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";
import { ImageViewer } from "@/components/ui/ImageViewer";
import { PhotoGallery, ItemSidebar, RelatedItems } from "@/components/items";

// ─── Mock data ────────────────────────────────────────────────────────────────

const PLACEHOLDER_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80",
    alt: "MacBook Pro on a desk",
    caption: "Found on desk near window — 3rd floor library",
  },
  {
    src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&q=80",
    alt: "MacBook Pro lid close-up",
    caption: "Lid shows a small scratch at bottom-left corner",
  },
  {
    src: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&q=80",
    alt: "MacBook Pro bottom label",
    caption: "No identifying stickers or labels on exterior",
  },
];

const HEADPHONE_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
    alt: "Sony WH-1000XM4 headphones",
    caption: "Last seen in cafeteria, Block B",
  },
  {
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80",
    alt: "Headphone case",
    caption: "Comes with black hard carry case",
  },
];

const MOCK_ITEMS: Record<
  string,
  {
    id: string;
    name: string;
    category: string;
    location: string;
    status: "found" | "lost";
    daysAgo: number;
    color: string;
    text: string;
    description: string;
    reportedBy: string;
    claimCount: number;
    matched: boolean;
    photos: { src: string; alt: string; caption?: string }[];
  }
> = {
  "1": {
    id: "1",
    name: 'Space Gray MacBook Pro 14"',
    category: "Electronics",
    location: "Library, 3rd Floor, Table near window (Row C)",
    status: "found",
    daysAgo: 1,
    color: "#C8DFFE",
    text: "#3B7FD4",
    description:
      "Space gray MacBook Pro 14-inch found on a desk near the window on the 3rd floor of the main library. Has a small scratch on the bottom-left corner of the lid. No stickers. Charger not included.",
    reportedBy: "Alex R.",
    claimCount: 2,
    matched: false,
    photos: PLACEHOLDER_PHOTOS,
  },
  "2": {
    id: "2",
    name: "Sony WH-1000XM4 Headphones",
    category: "Electronics",
    location: "Cafeteria, Block B, Near the entrance",
    status: "lost",
    daysAgo: 2,
    color: "#FDE8D8",
    text: "#C2622A",
    description:
      "Lost my Sony WH-1000XM4 headphones in the cafeteria during lunch. Midnight black colour in a black hard case with a small keychain attached. Please reach out if found.",
    reportedBy: "Heet Viradiya",
    claimCount: 0,
    matched: false,
    photos: HEADPHONE_PHOTOS,
  },
};

const statusConfig = {
  found: { label: "Found", variant: "status-green" as const },
  lost: { label: "Lost", variant: "status-red" as const },
};

const relatedItems = [
  {
    id: "7",
    name: "HP Pavilion 15 Charger",
    location: "Library, 2F",
    status: "found",
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    id: "5",
    name: "Campus ID — STU-7821",
    location: "Admin Block",
    status: "found",
    color: "#EDE8FD",
    text: "#6B3EDE",
  },
  {
    id: "3",
    name: "House Keys (Blue Lanyard)",
    location: "Eng. Block",
    status: "found",
    color: "#D4F4DC",
    text: "#2E7D45",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = MOCK_ITEMS[id] ?? MOCK_ITEMS["1"];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimDone, setClaimDone] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [message, setMessage] = useState("");

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  async function submitClaim() {
    setClaimLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setClaimLoading(false);
    setClaimOpen(false);
    setClaimDone(true);
  }

  const { label: statusLabel, variant: statusVariant } =
    statusConfig[item.status];

  return (
    <>
      <ImageViewer
        images={item.photos}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Link
            href="/items"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-black/40 hover:text-black/70 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />{" "}
            Items directory
          </Link>
          <span className="text-black/20">/</span>
          <span className="text-[13px] font-semibold text-black/60 truncate max-w-[200px]">
            {item.name}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left column */}
          <div className="space-y-6">
            <Card variant="default" padding="none" className="overflow-hidden">
              <div className="relative">
                <PhotoGallery
                  photos={item.photos}
                  color={item.color}
                  text={item.text}
                  onOpenLightbox={openLightbox}
                />
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant={statusVariant} size="sm" dot>
                    {statusLabel}
                  </Badge>
                </div>
              </div>
              <div className="p-7 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="font-display text-[32px] italic text-[#111010] leading-tight">
                      {item.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" size="sm">
                        {item.category}
                      </Badge>
                      <span className="text-[12px] text-black/30 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.daysAgo === 1
                          ? "Reported today"
                          : `${item.daysAgo} days ago`}
                      </span>
                      {item.photos.length > 0 && (
                        <button
                          onClick={() => openLightbox(0)}
                          className="text-[12px] text-black/30 font-medium flex items-center gap-1 hover:text-[#3B7FD4] transition-colors"
                        >
                          <Images className="w-3 h-3" />
                          {item.photos.length} photo
                          {item.photos.length > 1 ? "s" : ""}
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigator.share?.({
                        title: item.name,
                        url: window.location.href,
                      })
                    }
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-black/30 hover:text-black/60 hover:bg-black/5 transition-all shrink-0"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <hr className="border-none h-px bg-black/6" />
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                    Description
                  </p>
                  <p className="text-[14px] text-black/60 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: <MapPin className="w-3.5 h-3.5" />,
                      label: "Last seen",
                      value: item.location,
                    },
                    {
                      icon: <Tag className="w-3.5 h-3.5" />,
                      label: "Category",
                      value: item.category,
                    },
                    {
                      icon: <User className="w-3.5 h-3.5" />,
                      label: "Reported by",
                      value: item.reportedBy,
                    },
                    {
                      icon: <Calendar className="w-3.5 h-3.5" />,
                      label: "Date reported",
                      value:
                        item.daysAgo === 1
                          ? "Today"
                          : `${item.daysAgo} days ago`,
                    },
                  ].map((row, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-black/30">
                        {row.icon}
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          {row.label}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-[#111010] pl-5">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {claimDone && (
              <div className="bg-[#D4F4DC] border border-[#A8E6C2] rounded-2xl p-5 flex items-start gap-4 animate-fade-up">
                <CheckCircle className="w-5 h-5 text-[#2E7D45] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[14px] text-[#1a4d2a]">
                    Claim submitted!
                  </p>
                  <p className="text-[13px] text-[#2E7D45] font-medium mt-0.5">
                    The finder has been notified. You&apos;ll hear back within
                    24 hours.
                  </p>
                </div>
              </div>
            )}

            <RelatedItems items={relatedItems} />
          </div>

          {/* Right sidebar */}
          <ItemSidebar
            item={item}
            claimDone={claimDone}
            onOpenClaim={() => setClaimOpen(true)}
            onOpenLightbox={openLightbox}
          />
        </div>
      </div>

      {/* Claim modal */}
      <Modal open={claimOpen} onClose={() => setClaimOpen(false)} size="md">
        <ModalHeader
          title="Submit a claim"
          description="Tell us why this item is yours."
          onClose={() => setClaimOpen(false)}
        />
        <ModalBody>
          <div className="space-y-5">
            <div className="flex items-center gap-3 bg-[#F7F4F0] rounded-2xl px-4 py-3 border border-black/5">
              {item.photos.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.photos[0].src}
                  alt={item.photos[0].alt}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: item.color }}
                >
                  <Package className="w-5 h-5" style={{ color: item.text }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-[#111010] leading-tight truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-black/35 font-medium">
                  {item.location}
                </p>
              </div>
              <Badge variant={statusVariant} size="sm">
                {statusLabel}
              </Badge>
            </div>
            <Textarea
              label="Describe how you know this is yours"
              placeholder="e.g. My laptop has a scratch on the lid, a blue sticker on the palm rest, and my name is written inside…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <div className="bg-[#FDE8D8]/50 rounded-2xl px-4 py-3 border border-[#FDB8A0]/30 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#C2622A] shrink-0 mt-0.5" />
              <p className="text-[12px] font-medium text-[#C2622A] leading-relaxed">
                Provide specific details to help the finder verify your claim
                quickly. False claims may result in account suspension.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" onClick={() => setClaimOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={claimLoading}
            disabled={!message.trim() || claimLoading}
            className="btn-magnetic"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={submitClaim}
          >
            {claimLoading ? "Submitting…" : "Submit claim"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
