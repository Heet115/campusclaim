"use client";

import { AlertCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { OverviewTab, ItemsTab, ClaimsTab, UsersTab } from "@/components/admin";
import { ADMIN_ITEMS, ADMIN_CLAIMS, ADMIN_USERS } from "@/lib/mock-data";

export default function AdminPage() {
  const pendingClaims = ADMIN_CLAIMS.filter(
    (c) => c.status === "pending",
  ).length;

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Administration
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Admin panel.
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {pendingClaims > 0 && (
            <div className="flex items-center gap-2 bg-[#FDE8D8]/70 border border-[#FDB8A0]/60 rounded-2xl px-4 py-2.5">
              <AlertCircle className="w-4 h-4 text-[#C2622A] shrink-0" />
              <span className="text-[13px] font-bold text-[#C2622A]">
                {pendingClaims} pending
              </span>
            </div>
          )}
          <Badge variant="solid" size="sm">
            <ShieldCheck className="w-3 h-3 mr-1" /> Admin
          </Badge>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="overview" variant="pill">
        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-5 py-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items" badge={ADMIN_ITEMS.length}>
              Items
            </TabsTrigger>
            <TabsTrigger value="claims" badge={pendingClaims}>
              Claims
            </TabsTrigger>
            <TabsTrigger value="users" badge={ADMIN_USERS.length}>
              Users
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="items">
          <ItemsTab />
        </TabsContent>
        <TabsContent value="claims">
          <ClaimsTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
