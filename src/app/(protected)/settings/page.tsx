"use client";

import {
  Bell,
  Shield,
  Eye,
  Smartphone,
  Mail,
  Moon,
  Globe,
  Lock,
  Key,
  Trash2,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

// ─── Section wrappers ─────────────────────────────────────────────────────────

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <div className="px-7 py-5 border-b border-black/5 bg-[#F7F4F0]/40">
        <h2 className="text-[15px] font-bold text-[#111010]">{title}</h2>
        {description && (
          <p className="text-[13px] font-medium text-black/40 mt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="divide-y divide-black/4">{children}</div>
    </Card>
  );
}

function SwitchRow({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-6 px-7 py-5">
      <div className="space-y-0.5 min-w-0">
        <p className="text-[14px] font-semibold text-[#111010]">{label}</p>
        {description && (
          <p className="text-[12px] font-medium text-black/40 leading-snug">
            {description}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onChange={() => setChecked((v) => !v)}
        size="md"
        className="shrink-0"
      />
    </div>
  );
}

function SelectRow({
  label,
  description,
  options,
  defaultValue,
}: {
  label: string;
  description?: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-7 py-5">
      <div className="flex-1 space-y-0.5 min-w-0">
        <p className="text-[14px] font-semibold text-[#111010]">{label}</p>
        {description && (
          <p className="text-[12px] font-medium text-black/40 leading-snug">
            {description}
          </p>
        )}
      </div>
      <div className="w-full sm:w-48 shrink-0">
        <Select options={options} value={value} onChange={setValue} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Notifications
// ─────────────────────────────────────────────────────────────────────────────

function NotificationsTab() {
  return (
    <div className="space-y-5">
      <SettingsSection
        title="Email notifications"
        description="Choose which events send you an email."
      >
        <SwitchRow
          label="Claim submitted on my item"
          description="When someone submits a claim on an item you reported found."
          defaultChecked
        />
        <SwitchRow
          label="Claim approved / rejected"
          description="Status updates on claims you've submitted."
          defaultChecked
        />
        <SwitchRow
          label="New match found"
          description="When a found item closely matches something you reported lost."
          defaultChecked
        />
        <SwitchRow
          label="Handoff reminders"
          description="24-hour reminders when a handoff is pending."
          defaultChecked
        />
        <SwitchRow
          label="Weekly digest"
          description="A weekly summary of new items near your campus locations."
        />
      </SettingsSection>

      <SettingsSection
        title="Push notifications"
        description="Browser and mobile push alerts."
      >
        <SwitchRow
          label="Enable push notifications"
          description="Allow CampusClaim to send browser notifications."
          defaultChecked
        />
        <SwitchRow
          label="Urgent alerts only"
          description="Only notify for approved claims and handoffs."
        />
      </SettingsSection>

      <SettingsSection
        title="Notification frequency"
        description="Control how often you receive batched summaries."
      >
        <SelectRow
          label="Summary frequency"
          description="How often to batch non-urgent notifications."
          options={[
            { value: "realtime", label: "Real-time (instant)" },
            { value: "hourly", label: "Hourly digest" },
            { value: "daily", label: "Daily digest" },
            { value: "weekly", label: "Weekly digest" },
          ]}
          defaultValue="realtime"
        />
      </SettingsSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Privacy
// ─────────────────────────────────────────────────────────────────────────────

function PrivacyTab() {
  return (
    <div className="space-y-5">
      <SettingsSection
        title="Profile visibility"
        description="Control who can see your information."
      >
        <SelectRow
          label="Profile visibility"
          description="Who can view your name and profile on CampusClaim."
          options={[
            { value: "public", label: "All verified users" },
            { value: "connected", label: "Only during active claims" },
            { value: "private", label: "Completely private" },
          ]}
          defaultValue="public"
        />
        <SwitchRow
          label="Show hostel / room number"
          description="Display your room number to finders during active claims."
          defaultChecked
        />
        <SwitchRow
          label="Show phone number"
          description="Share your phone number with finders when a claim is approved."
        />
        <SwitchRow
          label="Appear in search"
          description="Let other users find you by name when assigning finders."
          defaultChecked
        />
      </SettingsSection>

      <SettingsSection
        title="Data & activity"
        description="Control how your data is used."
      >
        <SwitchRow
          label="Anonymise resolved reports"
          description="After an item is returned, remove your name from the public listing."
        />
        <SwitchRow
          label="Activity status"
          description="Show other users when you were last active."
          defaultChecked
        />
        <SwitchRow
          label="Analytics opt-in"
          description="Help improve CampusClaim by sharing anonymous usage data."
          defaultChecked
        />
      </SettingsSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Appearance
// ─────────────────────────────────────────────────────────────────────────────

function AppearanceTab() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-5">
      <SettingsSection
        title="Theme"
        description="Choose how CampusClaim looks for you."
      >
        <div className="px-7 py-5 space-y-3">
          <p className="text-[13px] font-semibold text-[#111010]/70">
            Colour scheme
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                value: "light",
                label: "Light",
                bg: "#F7F4F0",
                icon: <Globe className="w-5 h-5 text-black/30" />,
              },
              {
                value: "dark",
                label: "Dark",
                bg: "#111010",
                icon: <Moon className="w-5 h-5 text-white/40" />,
              },
              {
                value: "auto",
                label: "System",
                bg: "linear-gradient(135deg, #F7F4F0 50%, #111010 50%)",
                icon: <Smartphone className="w-5 h-5 text-black/30" />,
              },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  theme === t.value
                    ? "border-[#111010] shadow-sm"
                    : "border-transparent bg-[#F7F4F0] hover:border-black/15"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-black/6"
                  style={{ background: t.bg }}
                >
                  {t.icon}
                </div>
                <span
                  className={`text-[12px] font-bold ${theme === t.value ? "text-[#111010]" : "text-black/40"}`}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <SelectRow
          label="Font size"
          description="Adjust the interface text size."
          options={[
            { value: "sm", label: "Small" },
            { value: "md", label: "Medium (default)" },
            { value: "lg", label: "Large" },
          ]}
          defaultValue="md"
        />
        <SwitchRow
          label="Reduce motion"
          description="Disable animations and transitions throughout the interface."
        />
        <SwitchRow
          label="High contrast"
          description="Increase contrast ratios for better readability."
        />
      </SettingsSection>

      <SettingsSection title="Language & region">
        <SelectRow
          label="Language"
          description="Interface language preference."
          options={[
            { value: "en", label: "English" },
            { value: "hi", label: "Hindi" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
          ]}
          defaultValue="en"
        />
        <SelectRow
          label="Date format"
          options={[
            { value: "mdy", label: "MM/DD/YYYY" },
            { value: "dmy", label: "DD/MM/YYYY" },
            { value: "iso", label: "YYYY-MM-DD" },
          ]}
          defaultValue="mdy"
        />
      </SettingsSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Security
// ─────────────────────────────────────────────────────────────────────────────

function SecurityTab() {
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  async function changePassword() {
    setPassLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPassLoading(false);
    setPassSaved(true);
    setChangePassOpen(false);
    setTimeout(() => setPassSaved(false), 3000);
  }

  async function deleteAccount() {
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDeleting(false);
    setDeleteOpen(false);
  }

  return (
    <div className="space-y-5">
      {passSaved && (
        <div className="bg-[#D4F4DC] border border-[#A8E6C2] rounded-2xl p-4 flex items-center gap-3 animate-fade-up">
          <CheckCircle className="w-4 h-4 text-[#2E7D45] shrink-0" />
          <p className="text-[13px] font-bold text-[#1a4d2a]">
            Password updated successfully.
          </p>
        </div>
      )}

      <SettingsSection
        title="Authentication"
        description="Manage your sign-in credentials and sessions."
      >
        {/* Password row */}
        <div className="flex items-center justify-between gap-6 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F7F4F0] border border-black/5 flex items-center justify-center">
              <Key className="w-4 h-4 text-black/30" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#111010]">
                Password
              </p>
              <p className="text-[12px] text-black/35 font-medium">
                Last changed 30 days ago
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChangePassOpen(true)}
          >
            Change
          </Button>
        </div>

        {/* 2FA row */}
        <div className="flex items-center justify-between gap-6 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4F4DC] border border-[#A8E6C2]/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#2E7D45]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-semibold text-[#111010]">
                  Two-factor authentication
                </p>
                <Badge variant="status-green" size="sm">
                  Enabled
                </Badge>
              </div>
              <p className="text-[12px] text-black/35 font-medium">
                Authenticator app
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </div>

        {/* Email row */}
        <div className="flex items-center justify-between gap-6 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C8DFFE] border border-[#C8DFFE] flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#3B7FD4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-semibold text-[#111010]">
                  Email verified
                </p>
                <Badge variant="status-green" size="sm" dot>
                  Verified
                </Badge>
              </div>
              <p className="text-[12px] text-black/35 font-medium">
                maya@stanford.edu
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" href="/profile">
            Change
          </Button>
        </div>

        <SwitchRow
          label="Login alerts"
          description="Get notified by email when a new device signs in to your account."
          defaultChecked
        />
      </SettingsSection>

      <SettingsSection
        title="Sessions"
        description="Devices currently logged in to your account."
      >
        <div className="px-7 py-5 space-y-3">
          {[
            {
              device: "MacBook Pro — Chrome",
              location: "Stanford, CA",
              current: true,
              time: "Now",
            },
            {
              device: "iPhone 15 — Safari",
              location: "Stanford, CA",
              current: false,
              time: "2 hours ago",
            },
            {
              device: "Windows PC — Firefox",
              location: "Mountain View, CA",
              current: false,
              time: "Yesterday",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 bg-[#F7F4F0] rounded-2xl px-4 py-3.5 border border-black/5"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-black/30 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-[#111010]">
                      {s.device}
                    </p>
                    {s.current && (
                      <Badge variant="status-green" size="sm">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-black/35 font-medium">
                    {s.location} · {s.time}
                  </p>
                </div>
              </div>
              {!s.current && (
                <button className="text-[11px] font-bold text-red-400 hover:text-red-600 transition-colors shrink-0">
                  Revoke
                </button>
              )}
            </div>
          ))}
          <button className="w-full text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors text-center pt-1">
            Sign out all other sessions
          </button>
        </div>
      </SettingsSection>

      {/* Danger zone */}
      <div className="rounded-[24px] border-2 border-red-200/60 overflow-hidden">
        <div className="px-7 py-5 border-b border-red-100/60 bg-red-50/40">
          <h2 className="text-[15px] font-bold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Danger zone
          </h2>
          <p className="text-[13px] font-medium text-red-500/70 mt-0.5">
            Irreversible actions. Proceed with caution.
          </p>
        </div>
        <div className="bg-white divide-y divide-red-100/60">
          <div className="flex items-center justify-between gap-6 px-7 py-5">
            <div>
              <p className="text-[14px] font-bold text-[#111010]">
                Sign out everywhere
              </p>
              <p className="text-[12px] font-medium text-black/40 mt-0.5">
                Sign out of all devices and end all active sessions.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="w-3.5 h-3.5" />}
              iconPosition="left"
              href="/login"
            >
              Sign out all
            </Button>
          </div>
          <div className="flex items-center justify-between gap-6 px-7 py-5">
            <div>
              <p className="text-[14px] font-bold text-red-600">
                Delete account
              </p>
              <p className="text-[12px] font-medium text-black/40 mt-0.5">
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              iconPosition="left"
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* ── Change password modal ── */}
      <Modal
        open={changePassOpen}
        onClose={() => setChangePassOpen(false)}
        size="sm"
      >
        <ModalHeader
          title="Change password"
          description="Choose a strong password you don't use elsewhere."
          icon={<Lock className="w-4 h-4 text-black/40" />}
          onClose={() => setChangePassOpen(false)}
        />
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Current password"
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              autoComplete="current-password"
            />
            <Input
              label="New password"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              hint="At least 8 characters with a mix of letters and numbers."
              autoComplete="new-password"
            />
            <Input
              label="Confirm new password"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              error={
                confirmPass && newPass !== confirmPass
                  ? "Passwords do not match."
                  : undefined
              }
              autoComplete="new-password"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setChangePassOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={passLoading}
            disabled={
              !currentPass || !newPass || newPass !== confirmPass || passLoading
            }
            className="btn-magnetic"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={changePassword}
          >
            {passLoading ? "Saving…" : "Update password"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* ── Delete account modal ── */}
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} size="sm">
        <ModalHeader
          title="Delete account"
          description="This action is permanent and cannot be undone."
          icon={<Trash2 className="w-4 h-4 text-red-500" />}
          onClose={() => setDeleteOpen(false)}
        />
        <ModalBody>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200/60 rounded-2xl px-4 py-3.5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[13px] font-medium text-red-600 leading-relaxed">
                All your reports, claims, and profile data will be permanently
                erased. Active claims will be cancelled.
              </p>
            </div>
            <Input
              label='Type "delete" to confirm'
              placeholder="delete"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={deleting}
            disabled={deleteConfirm !== "delete" || deleting}
            icon={<Trash2 className="w-3.5 h-3.5" />}
            iconPosition="left"
            onClick={deleteAccount}
          >
            {deleting ? "Deleting…" : "Delete my account"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
          Account
        </p>
        <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
          Settings.
        </h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notifications" variant="underline">
        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-5 py-4">
          <TabsList>
            <TabsTrigger
              value="notifications"
              icon={<Bell className="w-3.5 h-3.5" />}
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" icon={<Eye className="w-3.5 h-3.5" />}>
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              icon={<Globe className="w-3.5 h-3.5" />}
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="security"
              icon={<Shield className="w-3.5 h-3.5" />}
            >
              Security
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="privacy">
          <PrivacyTab />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
