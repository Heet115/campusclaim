// Shared types used across multiple features.
// In production these would come from your API / Prisma schema.

import type { ReactNode } from "react";

// ─── Items ────────────────────────────────────────────────────────────────────

export type ItemStatus = "found" | "lost" | "claimed" | "resolved";

export interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  status: ItemStatus;
  daysAgo: number;
  color: string;
  text: string;
}

// ─── Claims ───────────────────────────────────────────────────────────────────

export type ClaimStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "reviewing"
  | "completed";

export interface TimelineEvent {
  title: string;
  description?: string;
  timestamp: string;
  color: "default" | "blue" | "green" | "amber" | "red";
  icon?: ReactNode;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface AdminItem {
  id: string;
  name: string;
  category: string;
  location: string;
  status: ItemStatus;
  reportedBy: string;
  date: string;
  claims: number;
  color: string;
  text: string;
}

export type AdminClaimStatus = "pending" | "approved" | "rejected";

export interface AdminClaim {
  id: string;
  item: string;
  claimer: string;
  finder: string;
  status: AdminClaimStatus;
  submitted: string;
  message: string;
}

export type UserRole = "student" | "admin" | "staff";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
  reports: number;
  claims: number;
  active: boolean;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotifKind =
  | "claim"
  | "match"
  | "approved"
  | "handoff"
  | "resolved"
  | "system";

export interface Notification {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
  actor?: string;
  actionLabel?: string;
  actionHref?: string;
}
