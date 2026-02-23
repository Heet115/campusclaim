"use client";

import {
  ArrowLeft,
  ArrowRight,
  Package,
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
  Shield,
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
  { title: "Item details", description: "What did you find?" },
  { title: "Location & time", description: "Where was it?" },
  { title: "Photos", description: "Add images" },
  { title: "Handoff", description: "How to return it" },
  { title: "Review", description: "Confirm & publish" },
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
  { value: "other", label: "Other" },
];

const CUSTODY_OPTIONS = [
  {
    value: "holding",
    label: "I'm holding it — will hand off in person",
    description: "You keep the item until the owner claims it",
  },
  {
    value: "security",
    label: "Dropped at Security / Admin desk",
    description: "The item has already been handed to campus staff",
  },
  {
    value: "lost-found",
    label: "Deposited at Lost & Found counter",
    description: "Already logged with the official L&F office",
  },
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
          What did you find?
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Be as descriptive as possible to help the owner identify their item.
        </p>
      </div>
      <Input
        label="Item name"
        placeholder="e.g. Black Sony WH-1000XM4 headphones"
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
        placeholder="Describe the item — colour, brand, condition, any visible marks, damage, or accessories found with it…"
        value={form.description ?? ""}
        onChange={(e) => set("description", e.target.value)}
        rows={4}
      />
      <Textarea
        label="Condition notes (optional)"
        placeholder="e.g. Screen is cracked, has a keychain attached, case missing…"
        value={form.condition ?? ""}
        onChange={(e) => set("condition", e.target.value)}
        rows={2}
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
          Where did you find it?
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          The exact location helps us match the finder with the right owner.
        </p>
      </div>
      <Select
        label="Location found"
        options={LOCATION_OPTIONS}
        value={form.location}
        onChange={(v) => set("location", v)}
        placeholder="Select a location…"
      />
      <Input
        label="Specific area"
        placeholder="e.g. 3rd floor, table near the window, charging station"
        value={form.locationDetail ?? ""}
        onChange={(e) => set("locationDetail", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date found"
          type="date"
          value={form.dateFound ?? ""}
          onChange={(e) => set("dateFound", e.target.value)}
        />
        <Input
          label="Approx. time"
          type="time"
          value={form.timeFound ?? ""}
          onChange={(e) => set("timeFound", e.target.value)}
        />
      </div>
    </FieldGroup>
  );
}

function StepPhotos() {
  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          Add photos.
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Clear photos from multiple angles make it much easier for the owner to
          identify their item.
        </p>
      </div>
      <FileUpload
        label="Upload photos"
        hint="JPG, PNG, WEBP · max 10 MB each · up to 5 files"
        accept="image/*"
        multiple
        maxFiles={5}
      />
      <div className="grid grid-cols-2 gap-3">
        {[
          "Photograph the front and back",
          "Capture any labels or serial numbers",
          "Show any damage or unique marks",
          "Include accessories if present",
        ].map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 bg-[#F7F4F0] rounded-xl px-3.5 py-3 border border-black/5"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#2E7D45] shrink-0 mt-0.5" />
            <span className="text-[12px] font-medium text-black/60 leading-snug">
              {tip}
            </span>
          </div>
        ))}
      </div>
    </FieldGroup>
  );
}

function StepHandoff({
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
          How will you return it?
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Let the owner know how they can get their item back.
        </p>
      </div>

      {/* Custody radio cards */}
      <div className="space-y-3">
        <p className="text-[13px] font-semibold text-[#111010]/70">
          Current custody
        </p>
        {CUSTODY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => set("custody", opt.value)}
            className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
              form.custody === opt.value
                ? "border-[#111010] bg-white shadow-sm"
                : "border-black/8 bg-[#F7F4F0] hover:border-black/20 hover:bg-white"
            }`}
          >
            <span
              className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                form.custody === opt.value
                  ? "border-[#111010]"
                  : "border-black/20"
              }`}
            >
              {form.custody === opt.value && (
                <span className="w-2 h-2 rounded-full bg-[#111010]" />
              )}
            </span>
            <div>
              <p
                className={`text-[13px] font-semibold ${form.custody === opt.value ? "text-[#111010]" : "text-black/60"}`}
              >
                {opt.label}
              </p>
              <p className="text-[12px] text-black/35 font-medium mt-0.5">
                {opt.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Input
        label="Preferred meetup location (if holding yourself)"
        placeholder="e.g. Library main entrance, Block A lobby…"
        value={form.meetupLocation ?? ""}
        onChange={(e) => set("meetupLocation", e.target.value)}
      />

      <div className="bg-[#D4F4DC]/60 border border-[#A8E6C2]/60 rounded-2xl px-4 py-3.5 flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#2E7D45] shrink-0 mt-0.5" />
        <p className="text-[13px] font-medium text-[#2E7D45] leading-relaxed">
          Always meet in a{" "}
          <span className="font-bold">public campus location</span> during
          daylight. CampusClaim verifies all student accounts for your safety.
        </p>
      </div>
    </FieldGroup>
  );
}

function StepReview({ form }: { form: Record<string, string> }) {
  const category = CATEGORY_OPTIONS.find((c) => c.value === form.category);
  const location = LOCATION_OPTIONS.find((l) => l.value === form.location);
  const custody = CUSTODY_OPTIONS.find((c) => c.value === form.custody);

  const rows = [
    {
      icon: <FileText className="w-3.5 h-3.5" />,
      label: "Item",
      value: form.name || "—",
    },
    {
      icon: <Package className="w-3.5 h-3.5" />,
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
      label: "Found on",
      value: form.dateFound || "—",
    },
    {
      icon: <Shield className="w-3.5 h-3.5" />,
      label: "Custody",
      value: custody?.label.split("—")[0].trim() || "—",
    },
  ];

  return (
    <FieldGroup>
      <div className="space-y-2">
        <h2 className="font-display text-[28px] italic text-[#111010] leading-tight">
          Review &amp; publish.
        </h2>
        <p className="text-[14px] text-black/40 font-medium">
          Confirm the details before your report goes live.
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

      <div className="bg-[#D4F4DC]/40 border border-[#A8E6C2]/40 rounded-2xl px-4 py-3.5">
        <p className="text-[12px] font-medium text-[#2E7D45] leading-relaxed">
          Your report will be visible to all verified campus users. You&apos;ll
          be notified when someone submits a matching claim.
        </p>
      </div>
    </FieldGroup>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ itemName }: { itemName: string }) {
  return (
    <div className="text-center max-w-md mx-auto animate-fade-up py-8">
      <div className="w-20 h-20 rounded-[28px] bg-[#D4F4DC] flex items-center justify-center mx-auto mb-6 shadow-sm animate-float">
        <CheckCircle className="w-10 h-10 text-[#2E7D45]" />
      </div>
      <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] mb-4">
        Report published!
      </h1>
      <p className="text-[15px] text-black/45 font-medium leading-relaxed mb-2">
        Your found item report for
      </p>
      <p className="text-[16px] font-bold text-[#111010] mb-6">
        &ldquo;{itemName}&rdquo;
      </p>
      <p className="text-[14px] text-black/40 font-medium leading-relaxed mb-8">
        The owner will be able to submit a claim. You&apos;ll be notified when a
        verified claim comes in so you can coordinate a handoff.
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
          View all items
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportFoundPage() {
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
    if (step === 3) return !!form.custody;
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

  if (submitted) return <SuccessScreen itemName={form.name || "found item"} />;

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
            Found item
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
        {step === 3 && <StepHandoff form={form} set={set} />}
        {step === 4 && <StepReview form={form} />}

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
              {loading ? "Publishing…" : "Publish report"}
            </Button>
          )}
        </div>
      </Card>

      {/* Reminder card */}
      <div className="bg-[#111010] rounded-[24px] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#A8E6C2] rounded-full blur-[70px] opacity-15 pointer-events-none" />
        <div className="relative space-y-3">
          <Shield className="w-4 h-4 text-[#A8E6C2]" />
          <p className="font-display text-[18px] italic text-white leading-tight">
            Good karma starts here.
          </p>
          <p className="text-[13px] text-white/40 font-medium leading-relaxed">
            Every item returned builds a safer, more trustworthy campus. Thank
            you for taking the time to report what you found.
          </p>
        </div>
      </div>
    </div>
  );
}
