"use client";

import { useState } from "react";
import {
  Key,
  Shield,
  Mail,
  Smartphone,
  Lock,
  Trash2,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { SettingsSection, SwitchRow } from "./SettingsSection";

export function SecurityTab() {
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

      {/* Change password modal */}
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

      {/* Delete account modal */}
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
