"use client";

import { ArrowLeft, ArrowRight, CheckCircle, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import {
  StepItemDetails,
  StepLocation,
  StepPhotos,
  StepReview,
  ReportSuccessScreen,
} from "@/components/report";

const STEPS = [
  { title: "Item details", description: "What was lost?" },
  { title: "Location & time", description: "Where and when?" },
  { title: "Photos", description: "Add images" },
  { title: "Review", description: "Confirm & submit" },
];

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

  if (submitted) {
    return (
      <ReportSuccessScreen
        icon={<Search className="w-10 h-10 text-[#C2622A]" />}
        iconBg="#FDE8D8"
        title="Report live!"
        itemName={form.name || "your item"}
        subtitle="Your lost item report for"
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
            Lost item
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
        {step === 0 && <StepItemDetails form={form} set={set} />}
        {step === 1 && <StepLocation form={form} set={set} />}
        {step === 2 && (
          <StepPhotos infoText="Items with photos are matched 3× faster on average. Even a product photo from the manufacturer helps." />
        )}
        {step === 3 && <StepReview form={form} />}

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
              {loading ? "Submitting…" : "Submit report"}
            </Button>
          )}
        </div>
      </Card>

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
