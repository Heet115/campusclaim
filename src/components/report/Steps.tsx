import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Search, MapPin, Calendar, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CATEGORY_OPTIONS, LOCATION_OPTIONS, FieldGroup } from "./shared";

// ─── Step 1: Item details ─────────────────────────────────────────────────────

export function StepItemDetails({
  form,
  set,
  heading = "What did you lose?",
  hint = "The more detail you provide, the faster it gets matched.",
}: {
  form: Record<string, string>;
  set: (key: string, val: string) => void;
  heading?: string;
  hint?: string;
}) {
  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          {heading}
        </h2>
        <p className="text-[14px] text-black/40 font-medium">{hint}</p>
      </div>
      <Input
        label="Item name"
        placeholder='e.g. Space Gray MacBook Pro 14"'
        value={form.name ?? ""}
        onChange={(e) => set("name", e.target.value)}
        required
      />
      <Select
        label="Category"
        options={CATEGORY_OPTIONS}
        value={form.category}
        onChange={(v) => set("category", v)}
        placeholder="Select a category…"
      />
      <Textarea
        label="Description"
        placeholder="Describe the item — colour, brand, any identifying marks, serial numbers, stickers, damage…"
        value={form.description ?? ""}
        onChange={(e) => set("description", e.target.value)}
        rows={4}
      />
      <Input
        label="Unique identifiers (optional)"
        placeholder="e.g. Serial #, name written inside, custom engraving…"
        value={form.identifiers ?? ""}
        onChange={(e) => set("identifiers", e.target.value)}
      />
    </FieldGroup>
  );
}

// ─── Step 2: Location & time ──────────────────────────────────────────────────

export function StepLocation({
  form,
  set,
  heading = "Where & when?",
  hint = "Tell us where you last had the item and roughly when you noticed it was missing.",
  dateLabel = "Date lost",
  timeLabel = "Approx. time",
  dateKey = "dateLost",
  timeKey = "timeLost",
}: {
  form: Record<string, string>;
  set: (key: string, val: string) => void;
  heading?: string;
  hint?: string;
  dateLabel?: string;
  timeLabel?: string;
  dateKey?: string;
  timeKey?: string;
}) {
  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          {heading}
        </h2>
        <p className="text-[14px] text-black/40 font-medium">{hint}</p>
      </div>
      <Select
        label="Last known location"
        options={LOCATION_OPTIONS}
        value={form.location}
        onChange={(v) => set("location", v)}
        placeholder="Select a location…"
      />
      <Input
        label="Specific area (optional)"
        placeholder="e.g. 3rd floor, table near the window, Row C"
        value={form.locationDetail ?? ""}
        onChange={(e) => set("locationDetail", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={dateLabel}
          type="date"
          value={form[dateKey] ?? ""}
          onChange={(e) => set(dateKey, e.target.value)}
        />
        <Input
          label={timeLabel}
          type="time"
          value={form[timeKey] ?? ""}
          onChange={(e) => set(timeKey, e.target.value)}
        />
      </div>
      <Textarea
        label="Additional context (optional)"
        placeholder="e.g. I was in the cafeteria for lunch, left around 1 pm…"
        value={form.locationContext ?? ""}
        onChange={(e) => set("locationContext", e.target.value)}
        rows={3}
      />
    </FieldGroup>
  );
}

// ─── Step 3: Photos ───────────────────────────────────────────────────────────

export function StepPhotos({ infoText }: { infoText?: string }) {
  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          Any photos?
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Adding photos dramatically increases your chance of recovery — even
          old photos help.
        </p>
      </div>
      <FileUpload
        label="Upload photos"
        hint="JPG, PNG, WEBP · max 10 MB each · up to 5 files"
        accept="image/*"
        multiple
        maxFiles={5}
      />
      {infoText && (
        <div className="bg-[#C8DFFE]/30 border border-[#C8DFFE] rounded-2xl px-4 py-3.5 flex items-start gap-3">
          <Search className="w-4 h-4 text-[#3B7FD4] shrink-0 mt-0.5" />
          <p className="text-[13px] font-medium text-[#3B7FD4] leading-relaxed">
            {infoText}
          </p>
        </div>
      )}
    </FieldGroup>
  );
}

// ─── Step: Review ─────────────────────────────────────────────────────────────

export function StepReview({
  form,
  dateKey = "dateLost",
  dateLabel = "Lost on",
  footerText = "By submitting, your report will be visible to all verified campus users to help locate your item.",
  footerColor = "#C2622A",
  footerBg = "#FDE8D8",
}: {
  form: Record<string, string>;
  dateKey?: string;
  dateLabel?: string;
  footerText?: string;
  footerColor?: string;
  footerBg?: string;
}) {
  const category = CATEGORY_OPTIONS.find((c) => c.value === form.category);
  const location = LOCATION_OPTIONS.find((l) => l.value === form.location);

  const rows = [
    {
      icon: <FileText className="w-3.5 h-3.5" />,
      label: "Item",
      value: form.name || "—",
    },
    {
      icon: <Search className="w-3.5 h-3.5" />,
      label: "Category",
      value: category?.label || "—",
    },
    {
      icon: <MapPin className="w-3.5 h-3.5" />,
      label: "Location",
      value:
        [location?.label, form.locationDetail].filter(Boolean).join(", ") ||
        "—",
    },
    {
      icon: <Calendar className="w-3.5 h-3.5" />,
      label: dateLabel,
      value: form[dateKey] || "—",
    },
  ];

  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          Review &amp; submit.
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Double-check the details before publishing.
        </p>
      </div>
      <Card variant="flat" padding="none" className="divide-y divide-black/5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <span className="text-black/30 mt-0.5 shrink-0">{row.icon}</span>
            <span className="text-[12px] font-bold text-black/35 uppercase tracking-wider w-20 shrink-0 mt-0.5">
              {row.label}
            </span>
            <span className="text-[13px] font-semibold text-[#111010] flex-1">
              {row.value}
            </span>
          </div>
        ))}
        {form.description && (
          <div className="flex items-start gap-3 px-5 py-3.5">
            <span className="text-black/30 mt-0.5 shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </span>
            <span className="text-[12px] font-bold text-black/35 uppercase tracking-wider w-20 shrink-0 mt-0.5">
              Desc.
            </span>
            <span className="text-[13px] font-medium text-black/60 flex-1 leading-relaxed">
              {form.description}
            </span>
          </div>
        )}
      </Card>
      <div
        className="rounded-2xl px-4 py-3.5"
        style={{ background: `${footerBg}40`, border: `1px solid ${footerBg}` }}
      >
        <p
          className="text-[12px] font-medium leading-relaxed"
          style={{ color: footerColor }}
        >
          {footerText}
        </p>
      </div>
    </FieldGroup>
  );
}
