"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Table, type TableColumn } from "@/components/ui/Table";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ADMIN_CLAIMS } from "@/lib/mock-data";
import { CLAIM_STATUS_CONFIG } from "@/lib/constants";
import type { AdminClaim, AdminClaimStatus } from "@/lib/types";

export function ClaimsTab() {
  const [claimsData, setClaimsData] = useState(ADMIN_CLAIMS);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);

  function approve(id: string) {
    setClaimsData((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "approved" as AdminClaimStatus } : c,
      ),
    );
  }

  async function confirmReject() {
    if (!rejectTarget) return;
    setRejecting(true);
    await new Promise((r) => setTimeout(r, 600));
    setClaimsData((prev) =>
      prev.map((c) =>
        c.id === rejectTarget
          ? { ...c, status: "rejected" as AdminClaimStatus }
          : c,
      ),
    );
    setRejecting(false);
    setRejectTarget(null);
  }

  const targetClaim = claimsData.find((c) => c.id === rejectTarget);

  const columns: TableColumn<AdminClaim>[] = [
    {
      key: "item",
      header: "Item",
      sortable: true,
      render: (row) => (
        <p className="font-semibold text-[13px] text-[#111010]">{row.item}</p>
      ),
    },
    {
      key: "claimer",
      header: "Claimer",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.claimer} size="xs" />
          <span className="text-[13px] font-semibold text-[#111010]">
            {row.claimer}
          </span>
        </div>
      ),
    },
    {
      key: "finder",
      header: "Finder",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.finder} size="xs" />
          <span className="text-[13px] font-medium text-black/60">
            {row.finder}
          </span>
        </div>
      ),
    },
    { key: "submitted", header: "Submitted", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={CLAIM_STATUS_CONFIG[row.status].variant} size="sm" dot>
          {CLAIM_STATUS_CONFIG[row.status].label}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) =>
        row.status === "pending" ? (
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => approve(row.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#D4F4DC] text-[#2E7D45] rounded-xl text-[11px] font-bold hover:bg-[#bfeed0] transition-colors"
            >
              <CheckCircle className="w-3 h-3" /> Approve
            </button>
            <button
              onClick={() => setRejectTarget(row.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 text-red-500 rounded-xl text-[11px] font-bold hover:bg-red-100 transition-colors"
            >
              <XCircle className="w-3 h-3" /> Reject
            </button>
          </div>
        ) : (
          <span className="text-[12px] font-medium text-black/25">—</span>
        ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#FDE8D8]/60 border border-[#FDB8A0]/50 rounded-2xl px-4 py-2.5">
          <Clock className="w-4 h-4 text-[#C2622A] shrink-0" />
          <span className="text-[13px] font-bold text-[#C2622A]">
            {claimsData.filter((c) => c.status === "pending").length} claim
            {claimsData.filter((c) => c.status === "pending").length !== 1
              ? "s"
              : ""}{" "}
            pending review
          </span>
        </div>
      </div>
      <Table columns={columns} data={claimsData} stickyHeader />

      <ConfirmDialog
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={confirmReject}
        loading={rejecting}
        variant="warning"
        title="Reject this claim?"
        description={
          targetClaim
            ? `This will reject ${targetClaim.claimer}'s claim on "${targetClaim.item}". The claimer will be notified.`
            : "This action will reject the claim."
        }
        confirmLabel="Reject claim"
        cancelLabel="Keep pending"
        icon={<XCircle className="w-6 h-6" />}
      />
    </div>
  );
}
