"use client";

import { useState } from "react";
import { Search, Ban, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Table, type TableColumn } from "@/components/ui/Table";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ADMIN_USERS } from "@/lib/mock-data";
import { USER_ROLE_CONFIG } from "@/lib/constants";
import type { AdminUser } from "@/lib/types";

export function UsersTab() {
  const [search, setSearch] = useState("");
  const [usersData, setUsersData] = useState(ADMIN_USERS);
  const [suspendTarget, setSuspendTarget] = useState<string | null>(null);
  const [suspending, setSuspending] = useState(false);

  const filtered = usersData.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const targetUser = usersData.find((u) => u.id === suspendTarget);

  async function confirmSuspend() {
    if (!suspendTarget) return;
    setSuspending(true);
    await new Promise((r) => setTimeout(r, 600));
    setUsersData((prev) =>
      prev.map((u) =>
        u.id === suspendTarget ? { ...u, active: !u.active } : u,
      ),
    );
    setSuspending(false);
    setSuspendTarget(null);
  }

  const columns: TableColumn<AdminUser>[] = [
    {
      key: "name",
      header: "User",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={row.name}
            size="sm"
            status={row.active ? "online" : "offline"}
          />
          <div>
            <p className="font-semibold text-[13px] text-[#111010]">
              {row.name}
            </p>
            <p className="text-[11px] text-black/35 font-medium">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (row) => (
        <Badge variant={USER_ROLE_CONFIG[row.role].variant} size="sm">
          {USER_ROLE_CONFIG[row.role].label}
        </Badge>
      ),
    },
    { key: "joined", header: "Joined", sortable: true },
    {
      key: "reports",
      header: "Reports",
      align: "center",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-[13px] text-[#111010]">
          {row.reports}
        </span>
      ),
    },
    {
      key: "claims",
      header: "Claims",
      align: "center",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-[13px] text-[#111010]">
          {row.claims}
        </span>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (row) => (
        <Badge
          variant={row.active ? "status-green" : "status-red"}
          size="sm"
          dot
        >
          {row.active ? "Active" : "Suspended"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row) => (
        <div className="flex items-center gap-1.5 justify-end">
          {row.active ? (
            <button
              onClick={() => setSuspendTarget(row.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-red-400 hover:bg-red-50 transition-colors"
            >
              <Ban className="w-3 h-3" /> Suspend
            </button>
          ) : (
            <button
              onClick={() => setSuspendTarget(row.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#2E7D45] hover:bg-[#D4F4DC] transition-colors"
            >
              <UserCheck className="w-3 h-3" /> Reinstate
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex items-center gap-2.5 flex-1 bg-[#F7F4F0] rounded-2xl px-4 py-2.5 border border-black/5 focus-within:bg-white focus-within:border-[#7EB3F7]/40 focus-within:ring-4 focus-within:ring-[#7EB3F7]/5 transition-all">
          <Search className="w-3.5 h-3.5 text-black/30 shrink-0" />
          <input
            type="text"
            placeholder="Search users by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-[#111010] placeholder:text-black/30 outline-none"
          />
        </div>
      </div>
      <Table
        columns={columns}
        data={filtered}
        stickyHeader
        emptyState={
          <p className="text-[13px] font-medium text-black/30">
            No users match your search.
          </p>
        }
      />

      <ConfirmDialog
        open={!!suspendTarget}
        onClose={() => setSuspendTarget(null)}
        onConfirm={confirmSuspend}
        loading={suspending}
        variant={targetUser?.active ? "danger" : "info"}
        title={
          targetUser?.active ? "Suspend this user?" : "Reinstate this user?"
        }
        description={
          targetUser?.active
            ? `${targetUser.name} will lose access. Their items and claims will be frozen.`
            : `${targetUser?.name} will regain full access to the platform.`
        }
        confirmLabel={targetUser?.active ? "Suspend user" : "Reinstate user"}
        cancelLabel="Cancel"
        icon={
          targetUser?.active ? (
            <Ban className="w-6 h-6" />
          ) : (
            <UserCheck className="w-6 h-6" />
          )
        }
      />
    </div>
  );
}
