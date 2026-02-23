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
  Expand,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";
import { ImageViewer } from "@/components/ui/ImageViewer";

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
    reportedBy: "Maya P.",
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

// ─── Photo gallery sub-component ─────────────────────────────────────────────

function PhotoGallery({
  photos,
  color,
  text,
  onOpenLightbox,
}: {
  photos: { src: string; alt: string; caption?: string }[];
  color: string;
  text: string;
  onOpenLightbox: (index: number) => void;
}) {
  const [active, setActive] = useState(0);

  // No photos — show coloured placeholder
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
      {/* Main photo */}
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

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Expand hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white/80 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 pointer-events-none">
          <Expand className="w-3 h-3" />
          View full
        </div>

        {/* Badge overlay */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
            <Images className="w-3 h-3 text-white/70" />
            <span className="text-[11px] font-bold text-white/80">
              {photos.length} photo{photos.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Prev / Next arrows */}
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

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div className="flex items-center gap-2 px-5 py-4 overflow-x-auto bg-[#F7F4F0]/60 border-t border-black/5">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200
                ${
                  i === active
                    ? "border-[#111010] scale-105 shadow-md"
                    : "border-transparent opacity-50 hover:opacity-80 hover:scale-105"
                }
              `}
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

          {/* Dot indicators for small screens fallback */}
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all ${
                  i === active
                    ? "w-4 h-1.5 bg-[#111010]"
                    : "w-1.5 h-1.5 bg-black/20"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
      {/* ── Full-screen lightbox ── */}
      <ImageViewer
        images={item.photos}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <div className="space-y-8">
        {/* ── Back breadcrumb ── */}
        <div className="flex items-center gap-2">
          <Link
            href="/items"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-black/40 hover:text-black/70 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Items directory
          </Link>
          <span className="text-black/20">/</span>
          <span className="text-[13px] font-semibold text-black/60 truncate max-w-[200px]">
            {item.name}
          </span>
        </div>

        {/* ── Main layout ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left column */}
          <div className="space-y-6">
            {/* Hero card */}
            <Card variant="default" padding="none" className="overflow-hidden">
              {/* Photo gallery */}
              <div className="relative">
                <PhotoGallery
                  photos={item.photos}
                  color={item.color}
                  text={item.text}
                  onOpenLightbox={openLightbox}
                />
                {/* Status badge overlay on the card */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant={statusVariant} size="sm" dot>
                    {statusLabel}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 space-y-6">
                {/* Title row */}
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

                {/* Description */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                    Description
                  </p>
                  <p className="text-[14px] text-black/60 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Meta grid */}
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

            {/* Claim success banner */}
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

            {/* Related items */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/30 mb-4">
                Other recent items
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedItems.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/items/${rel.id}`}
                    className="block group"
                  >
                    <Card
                      variant="flat"
                      padding="none"
                      hover
                      className="p-4 flex flex-col gap-3"
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: rel.color }}
                      >
                        <Package
                          className="w-5 h-5"
                          style={{ color: rel.text }}
                        />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#111010] leading-snug group-hover:text-[#3B7FD4] transition-colors">
                          {rel.name}
                        </p>
                        <p className="text-[11px] text-black/35 font-medium mt-1 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {rel.location}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-5 lg:sticky lg:top-28">
            {/* CTA card */}
            <Card variant="default" padding="none" className="p-6 space-y-5">
              <div className="space-y-1.5">
                <h2 className="font-display text-[22px] italic text-[#111010]">
                  {item.status === "found"
                    ? "Is this yours?"
                    : "Did you find it?"}
                </h2>
                <p className="text-[13px] text-black/45 font-medium leading-relaxed">
                  {item.status === "found"
                    ? "Submit a claim and the finder will reach out to verify and coordinate a handoff."
                    : "If you've found this item, report it so we can reunite it with the owner."}
                </p>
              </div>

              {item.claimCount > 0 && (
                <div className="flex items-center gap-2 bg-[#FDE8D8]/60 rounded-xl px-3 py-2.5 border border-[#FDB8A0]/40">
                  <AlertCircle className="w-3.5 h-3.5 text-[#C2622A] shrink-0" />
                  <p className="text-[12px] font-semibold text-[#C2622A]">
                    {item.claimCount} claim{item.claimCount > 1 ? "s" : ""}{" "}
                    already submitted
                  </p>
                </div>
              )}

              {!claimDone ? (
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  className="btn-magnetic"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => setClaimOpen(true)}
                >
                  {item.status === "found" ? "Submit a claim" : "I found this!"}
                </Button>
              ) : (
                <Button variant="ghost" size="md" fullWidth disabled>
                  <CheckCircle className="w-4 h-4 mr-2" /> Claim submitted
                </Button>
              )}

              <Button variant="outline" size="sm" fullWidth href="/items">
                Browse other items
              </Button>
            </Card>

            {/* Photo count card */}
            {item.photos.length > 0 && (
              <Card variant="flat" padding="none" className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-3">
                  Photos ({item.photos.length})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {item.photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => openLightbox(i)}
                      className="relative aspect-square rounded-xl overflow-hidden group border-2 border-transparent hover:border-[#7EB3F7] transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {i === item.photos.length - 1 &&
                        item.photos.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-[13px]">
                              +{item.photos.length - 2}
                            </span>
                          </div>
                        )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => openLightbox(0)}
                  className="mt-3 text-[12px] font-bold text-[#7EB3F7] hover:text-[#3B7FD4] transition-colors flex items-center gap-1"
                >
                  <Expand className="w-3 h-3" /> View all photos
                </button>
              </Card>
            )}

            {/* Reporter card */}
            <Card variant="flat" padding="none" className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-4">
                Reported by
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={item.reportedBy} size="md" />
                <div>
                  <p className="font-semibold text-[14px] text-[#111010]">
                    {item.reportedBy}
                  </p>
                  <p className="text-[12px] text-black/35 font-medium">
                    Verified student
                  </p>
                </div>
                <Badge variant="status-green" size="sm" className="ml-auto">
                  Verified
                </Badge>
              </div>
            </Card>

            {/* Safety tip */}
            <div className="relative bg-[#111010] rounded-[24px] p-5 space-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7EB3F7] rounded-full blur-[50px] opacity-20 pointer-events-none" />
              <div className="relative">
                <AlertCircle className="w-4 h-4 text-[#7EB3F7] mb-2" />
                <p className="font-display text-[16px] italic text-white leading-tight mb-1.5">
                  Stay safe.
                </p>
                <p className="text-[12px] text-white/40 font-medium leading-relaxed">
                  Always meet in a{" "}
                  <span className="text-white/70 font-semibold">
                    public campus location
                  </span>{" "}
                  for handoffs. Never share personal financial details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Claim modal ── */}
      <Modal open={claimOpen} onClose={() => setClaimOpen(false)} size="md">
        <ModalHeader
          title="Submit a claim"
          description="Tell us why this item is yours."
          onClose={() => setClaimOpen(false)}
        />
        <ModalBody>
          <div className="space-y-5">
            {/* Item preview */}
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
