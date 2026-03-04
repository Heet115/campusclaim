"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  ProfileSidebar,
  PersonalInfoForm,
  CampusDetailsForm,
  VerificationCard,
} from "@/components/profile";

const INITIAL = {
  firstName: "Heet",
  lastName: "Viradiya",
  email: "hpviradiya05@gmail.com",
  phone: "+1 650 555 0102",
  department: "cs",
  year: "3",
  studentId: "STU-7821",
  bio: "3rd year CS student passionate about building products that help people. Lost things please find me 😅",
  website: "",
  hostel: "Block D, Room 412",
};

export default function ProfilePage() {
  const [form, setForm] = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: keyof typeof INITIAL, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function save() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const displayName = `${form.firstName} ${form.lastName}`.trim();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
          Account
        </p>
        <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
          My profile.
        </h1>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        <ProfileSidebar displayName={displayName} email={form.email} />

        <div className="space-y-6">
          {saved && (
            <div className="bg-[#D4F4DC] border border-[#A8E6C2] rounded-2xl p-4 flex items-center gap-3 animate-fade-up">
              <CheckCircle className="w-4 h-4 text-[#2E7D45] shrink-0" />
              <p className="text-[13px] font-bold text-[#1a4d2a]">
                Profile saved successfully.
              </p>
            </div>
          )}

          <PersonalInfoForm form={form} set={set} />
          <CampusDetailsForm form={form} set={set} />
          <VerificationCard />

          <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-6 py-4">
            <p className="text-[13px] font-medium text-black/40">
              {saved
                ? "All changes saved."
                : "Unsaved changes will be lost on navigation."}
            </p>
            <Button
              variant="primary"
              size="md"
              loading={saving}
              disabled={saving}
              className="btn-magnetic shrink-0"
              icon={
                saved ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
              onClick={save}
            >
              {saving ? "Saving…" : saved ? "Saved!" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
