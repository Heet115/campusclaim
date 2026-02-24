"use client";

import { ArrowLeft, ArrowRight, CheckCircle, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";
import { Stepper } from "@/components/ui/Stepper";
import {
  StepItemDetails,
  StepLocation,
  StepReview,
  FieldGroup,
  ReportSuccessScreen,
} from "@/components/report";

// ─── Found-specific data ──────────────────────────────────────────────────────

const STEPS = [
  { title: "Item details", description: "What did you find?" },
  { title: "Location & time", description: "Where was it?" },
  { title: "Photos", description: "Add images" },
  { title: "Handoff", description: "How to return it" },
  { title: "Review", description: "Confirm & publish" },
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

// ─── Found-specific steps ─────────────────────────────────────────────────────

function StepPhotosFound() {
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
      <div className="space-y-3">
        <p className="text-[13px] font-semibold text-[#111010]/70">
          Current custody
        </p>
        {CUSTODY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => set("custody", opt.value)}
            className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${form.custody === opt.value ? "border-[#111010] bg-white shadow-sm" : "border-black/8 bg-[#F7F4F0] hover:border-black/20 hover:bg-white"}`}
          >
            <span
              className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${form.custody === opt.value ? "border-[#111010]" : "border-black/20"}`}
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

  if (submitted) {
    return (
      <ReportSuccessScreen
        icon={<CheckCircle className="w-10 h-10 text-[#2E7D45]" />}
        iconBg="#D4F4DC"
        title="Report published!"
        itemName={form.name || "found item"}
        subtitle="Your found item report for"
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-black/40 hover:text-black/70 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />{" "}
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

      <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-6 py-5">
        <Stepper
          steps={STEPS}
          currentStep={step}
          direction="horizontal"
          size="sm"
        />
      </div>

      <Card variant="default" padding="none" className="p-8">
        {step === 0 && (
          <StepItemDetails
            form={form}
            set={set}
            heading="What did you find?"
            hint="Be as descriptive as possible to help the owner identify their item."
          />
        )}
        {step === 1 && (
          <StepLocation
            form={form}
            set={set}
            heading="Where did you find it?"
            hint="The exact location helps us match the finder with the right owner."
            dateLabel="Date found"
            timeLabel="Approx. time"
            dateKey="dateFound"
            timeKey="timeFound"
          />
        )}
        {step === 2 && <StepPhotosFound />}
        {step === 3 && <StepHandoff form={form} set={set} />}
        {step === 4 && (
          <StepReview
            form={form}
            dateKey="dateFound"
            dateLabel="Found on"
            footerText="Your report will be visible to all verified campus users. You'll be notified when someone submits a matching claim."
            footerColor="#2E7D45"
            footerBg="#D4F4DC"
          />
        )}

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
                className={`rounded-full transition-all duration-300 ${i === step ? "w-5 h-1.5 bg-[#111010]" : i < step ? "w-1.5 h-1.5 bg-[#111010]/40" : "w-1.5 h-1.5 bg-black/15"}`}
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
