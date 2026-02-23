"use client";

import {
  ArrowLeft,
  ArrowRight,
  Search,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Smartphone,
  Key,
  BookOpen,
  ShoppingBag,
  Stethoscope,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Stepper } from "@/components/ui/Stepper";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  { title: "Item details", description: "What was lost?" },
  { title: "Location & time", description: "Where and when?" },
  { title: "Photos", description: "Add images" },
  { title: "Review", description: "Confirm & submit" },
];

const CATEGORY_OPTIONS = [
  {
    value: "electronics",
    label: "Electronics",
    icon: <Smartphone className="w-4 h-4" />,
  },
  { value: "keys", label: "Keys", icon: <Key className="w-4 h-4" /> },
  {
    value: "documents",
    label: "Documents",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    value: "accessories",
    label: "Accessories",
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    value: "medical",
    label: "Medical",
    icon: <Stethoscope className="w-4 h-4" />,
  },
  { value: "other", label: "Other", icon: <HelpCircle className="w-4 h-4" /> },
];

const LOCATION_OPTIONS = [
  { value: "library", label: "Library" },
  { value: "cafeteria-a", label: "Cafeteria, Block A" },
  { value: "cafeteria-b", label: "Cafeteria, Block B" },
  { value: "engineering", label: "Engineering Block" },
  { value: "admin", label: "Admin Block" },
  { value: "sports", label: "Sports Complex" },
  { value: "medical", label: "Medical Sciences" },
  { value: "main-gate", label: "Main Gate" },
  { value: "hostel", label: "Hostel Area" },
  { value: "other", label: "Other / Not sure" },
];

// ─── Field wrapper ────────────────────────────────────────────────────────────

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

// ─── Step content ─────────────────────────────────────────────────────────────

function StepItemDetails({
  form,
  set,
}: {
  form: Record<string, string>;
  set: (key: string, val: string) => void;
}) {
  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          What did you lose?
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          The more detail you provide, the faster it gets matched.
        </p>
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

function StepLocation({
  form,
  set,
}: {
  form: Record<string, string>;
  set: (key: string, val: string) => void;
}) {
  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          Where &amp; when?
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Tell us where you last had the item and roughly when you noticed it
          was missing.
        </p>
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
          label="Date lost"
          type="date"
          value={form.dateLost ?? ""}
          onChange={(e) => set("dateLost", e.target.value)}
        />
        <Input
          label="Approx. time"
          type="time"
          value={form.timeLost ?? ""}
          onChange={(e) => set("timeLost", e.target.value)}
        />
      </div>
      <Textarea
        label="Additional context (optional)"
        placeholder="e.g. I was in the cafeteria for lunch, left around 1 pm and noticed it missing at 2 pm in class…"
        value={form.locationContext ?? ""}
        onChange={(e) => set("locationContext", e.target.value)}
        rows={3}
      />
    </FieldGroup>
  );
}

function StepPhotos() {
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
      <div className="bg-[#C8DFFE]/30 border border-[#C8DFFE] rounded-2xl px-4 py-3.5 flex items-start gap-3">
        <Search className="w-4 h-4 text-[#3B7FD4] shrink-0 mt-0.5" />
        <p className="text-[13px] font-medium text-[#3B7FD4] leading-relaxed">
          Items with photos are matched{" "}
          <span className="font-bold">3× faster</span> on average. Even a
          product photo from the manufacturer helps.
        </p>
      </div>
    </FieldGroup>
  );
}

function StepReview({ form }: { form: Record<string, string> }) {
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
      label: "Lost on",
      value: form.dateLost || "—",
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

      <div className="bg-[#FDE8D8]/40 border border-[#FDB8A0]/40 rounded-2xl px-4 py-3.5">
        <p className="text-[12px] font-medium text-[#C2622A] leading-relaxed">
          By submitting, your report will be visible to all verified campus
          users to help locate your item.
        </p>
      </div>
    </FieldGroup>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ itemName }: { itemName: string }) {
  return (
    <div className="text-center max-w-md mx-auto animate-fade-up py-8">
      <div className="w-20 h-20 rounded-[28px] bg-[#FDE8D8] flex items-center justify-center mx-auto mb-6 shadow-sm animate-float">
        <Search className="w-10 h-10 text-[#C2622A]" />
      </div>
      <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] mb-4">
        Report live!
      </h1>
      <p className="text-[15px] text-black/45 font-medium leading-relaxed mb-2">
        Your lost item report for
      </p>
      <p className="text-[16px] font-bold text-[#111010] mb-6">
        &ldquo;{itemName}&rdquo;
      </p>
      <p className="text-[14px] text-black/40 font-medium leading-relaxed mb-8">
        You&apos;ll get an email notification the moment someone finds a match.
        Keep an eye on your dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          href="/dashboard"
          variant="primary"
          size="md"
          className="btn-magnetic"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Go to dashboard
        </Button>
        <Button href="/items" variant="outline" size="md">
          Browse found items
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportLostPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function canAdvance() {
    if (step === 0) return !!(form.name?.trim() && form.category);
    if (step === 1) return !!form.location;
    return true;
  }

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function submit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) return <SuccessScreen itemName={form.name || "your item"} />;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-black/40 hover:text-black/70 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30">
            Report
          </p>
          <h1 className="font-display text-[36px] italic text-[#111010] leading-none">
            Lost item
          </h1>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-6 py-5">
        <Stepper
          steps={STEPS}
          currentStep={step}
          direction="horizontal"
          size="sm"
        />
      </div>

      {/* Form card */}
      <Card variant="default" padding="none" className="p-8">
        {step === 0 && <StepItemDetails form={form} set={set} />}
        {step === 1 && <StepLocation form={form} set={set} />}
        {step === 2 && <StepPhotos />}
        {step === 3 && <StepReview form={form} />}

        {/* Nav buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-black/6">
          <Button
            variant="ghost"
            size="sm"
            onClick={back}
            disabled={step === 0}
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back
          </Button>

          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-5 h-1.5 bg-[#111010]"
                    : i < step
                      ? "w-1.5 h-1.5 bg-[#111010]/40"
                      : "w-1.5 h-1.5 bg-black/15"
                }`}
              />
            ))}
          </div>

          {step < STEPS.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={next}
              disabled={!canAdvance()}
              className="btn-magnetic"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              disabled={loading}
              className="btn-magnetic"
              icon={<CheckCircle className="w-4 h-4" />}
              onClick={submit}
            >
              {loading ? "Submitting…" : "Submit report"}
            </Button>
          )}
        </div>
      </Card>

      {/* Tips sidebar card */}
      <div className="bg-[#111010] rounded-[24px] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#7EB3F7] rounded-full blur-[70px] opacity-15 pointer-events-none" />
        <div className="relative space-y-3">
          <Search className="w-4 h-4 text-[#7EB3F7]" />
          <p className="font-display text-[18px] italic text-white leading-tight">
            Tips for faster recovery
          </p>
          <ul className="space-y-2">
            {[
              "Add photos — even manufacturer images help",
              "Be specific about location (floor, area, time)",
              "Include any unique marks, stickers, or damage",
              "Check the found items directory too",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7EB3F7] mt-1.5 shrink-0" />
                <span className="text-[13px] text-white/45 font-medium leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
