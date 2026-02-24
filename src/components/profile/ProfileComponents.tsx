"use client";

import { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Link as LinkIcon,
  Shield,
  FileText,
  Package,
  ArrowRight,
  Edit3,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEPARTMENT_OPTIONS = [
  { value: "cs", label: "Computer Science" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "mech", label: "Mechanical Engineering" },
  { value: "chem", label: "Chemical Engineering" },
  { value: "bio", label: "Biology / Life Sciences" },
  { value: "physics", label: "Physics" },
  { value: "math", label: "Mathematics" },
  { value: "med", label: "Medical Sciences" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "law", label: "Law" },
  { value: "other", label: "Other" },
];

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "pg", label: "Postgraduate" },
  { value: "phd", label: "PhD" },
  { value: "staff", label: "Staff / Faculty" },
];

const ACTIVITY_STATS = [
  { label: "Items reported", value: "3", color: "#C8DFFE", text: "#3B7FD4" },
  { label: "Claims submitted", value: "5", color: "#FDE8D8", text: "#C2622A" },
  { label: "Items recovered", value: "2", color: "#D4F4DC", text: "#2E7D45" },
  { label: "Match rate", value: "67%", color: "#EDE8FD", text: "#6B3EDE" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-0.5 pb-2">
      <h2 className="text-[15px] font-bold text-[#111010]">{title}</h2>
      {description && (
        <p className="text-[13px] text-black/40 font-medium">{description}</p>
      )}
    </div>
  );
}

function FormDivider() {
  return <hr className="border-none h-px bg-black/5 my-2" />;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function ProfileSidebar({
  displayName,
  email,
}: {
  displayName: string;
  email: string;
}) {
  const [editingAvatar, setEditingAvatar] = useState(false);

  return (
    <div className="space-y-5 lg:sticky lg:top-28">
      <Card
        variant="default"
        padding="none"
        className="p-6 flex flex-col items-center gap-5 text-center"
      >
        <div
          className="relative group cursor-pointer"
          onClick={() => setEditingAvatar((v) => !v)}
        >
          <Avatar name={displayName} size="xl" />
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
        </div>
        {editingAvatar && (
          <div className="w-full animate-fade-up">
            <label className="flex flex-col items-center gap-2 cursor-pointer bg-[#F7F4F0] rounded-2xl border border-dashed border-black/10 px-4 py-5 hover:border-black/20 hover:bg-[#F0EDE9] transition-all">
              <Camera className="w-5 h-5 text-black/30" />
              <span className="text-[12px] font-semibold text-black/50">
                Click to upload a photo
              </span>
              <span className="text-[11px] text-black/30 font-medium">
                JPG, PNG · max 5 MB
              </span>
              <input type="file" accept="image/*" className="sr-only" />
            </label>
          </div>
        )}
        <div className="space-y-1 w-full">
          <p className="font-display text-[22px] italic text-[#111010]">
            {displayName}
          </p>
          <p className="text-[12px] font-medium text-black/40">{email}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="status-green" size="sm" dot>
              Verified
            </Badge>
            <Badge variant="solid" size="sm">
              Student
            </Badge>
          </div>
        </div>
        <div className="w-full border-t border-black/5 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/25 mb-3">
            Activity
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ACTIVITY_STATS.map((s, i) => (
              <div
                key={i}
                className="rounded-xl px-3 py-2.5 border border-black/5 text-center"
                style={{ background: `${s.color}30` }}
              >
                <p
                  className="font-display text-[20px] italic font-bold"
                  style={{ color: s.text }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] font-bold text-black/35 leading-tight mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card variant="flat" padding="none" className="divide-y divide-black/5">
        {[
          {
            label: "My claims",
            href: "/claims",
            icon: <FileText className="w-3.5 h-3.5" />,
          },
          {
            label: "Settings",
            href: "/settings",
            icon: <Shield className="w-3.5 h-3.5" />,
          },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F7F4F0] transition-colors group"
          >
            <span className="text-black/30 group-hover:text-black/60 transition-colors">
              {link.icon}
            </span>
            <span className="text-[13px] font-semibold text-black/60 group-hover:text-[#111010] transition-colors flex-1">
              {link.label}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-black/15 group-hover:text-black/40 group-hover:translate-x-0.5 transition-all" />
          </a>
        ))}
      </Card>
    </div>
  );
}

// ─── Form sections ────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  studentId: string;
  bio: string;
  website: string;
  hostel: string;
}

export function PersonalInfoForm({
  form,
  set,
}: {
  form: FormState;
  set: (key: keyof FormState, val: string) => void;
}) {
  return (
    <Card variant="default" padding="none" className="p-7 space-y-5">
      <SectionTitle
        title="Personal information"
        description="How your name and contact appear to other users."
      />
      <FormDivider />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="First name"
          value={form.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          prefix={<Edit3 className="w-3.5 h-3.5" />}
        />
        <Input
          label="Last name"
          value={form.lastName}
          onChange={(e) => set("lastName", e.target.value)}
        />
      </div>
      <Input
        label="Email address"
        type="email"
        value={form.email}
        onChange={(e) => set("email", e.target.value)}
        prefix={<Mail className="w-3.5 h-3.5" />}
        hint="Must be your campus email address."
      />
      <Input
        label="Phone number (optional)"
        type="tel"
        value={form.phone}
        onChange={(e) => set("phone", e.target.value)}
        prefix={<Phone className="w-3.5 h-3.5" />}
        hint="Shown only to verified finders/claimers during active handoffs."
      />
      <Textarea
        label="Bio (optional)"
        placeholder="Tell others a little about yourself…"
        value={form.bio}
        onChange={(e) => set("bio", e.target.value)}
        rows={3}
      />
      <Input
        label="Website / LinkedIn (optional)"
        placeholder="https://"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
        prefix={<LinkIcon className="w-3.5 h-3.5" />}
      />
    </Card>
  );
}

export function CampusDetailsForm({
  form,
  set,
}: {
  form: FormState;
  set: (key: keyof FormState, val: string) => void;
}) {
  return (
    <Card variant="default" padding="none" className="p-7 space-y-5">
      <SectionTitle
        title="Campus details"
        description="Used to verify your student status and improve matches."
      />
      <FormDivider />
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Department"
          options={DEPARTMENT_OPTIONS}
          value={form.department}
          onChange={(v) => set("department", v)}
        />
        <Select
          label="Year / Level"
          options={YEAR_OPTIONS}
          value={form.year}
          onChange={(v) => set("year", v)}
        />
      </div>
      <Input
        label="Student ID"
        value={form.studentId}
        onChange={(e) => set("studentId", e.target.value)}
        prefix={<GraduationCap className="w-3.5 h-3.5" />}
        hint="Your 7-digit campus ID number."
      />
      <Input
        label="Hostel / Room (optional)"
        placeholder="e.g. Block D, Room 412"
        value={form.hostel}
        onChange={(e) => set("hostel", e.target.value)}
        prefix={<Building className="w-3.5 h-3.5" />}
        hint="Helps finders suggest a convenient meetup location."
      />
    </Card>
  );
}

export function VerificationCard() {
  return (
    <Card variant="flat" padding="none" className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#D4F4DC] flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-[#2E7D45]" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-bold text-[#111010]">
              Account verified
            </p>
            <Badge variant="status-green" size="sm" dot>
              Active
            </Badge>
          </div>
          <p className="text-[13px] font-medium text-black/45 leading-relaxed">
            Your campus email has been verified. Other users can trust your
            identity during claims and handoffs.
          </p>
        </div>
      </div>
    </Card>
  );
}
