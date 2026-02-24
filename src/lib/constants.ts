// Status config maps used across admin, items, and claims pages.

import type { ItemStatus, AdminClaimStatus, UserRole } from "./types";

type BadgeVariant =
  | "status-green"
  | "status-amber"
  | "status-blue"
  | "status-red"
  | "solid";

export const ITEM_STATUS_CONFIG: Record<
  ItemStatus,
  { label: string; variant: BadgeVariant }
> = {
  found: { label: "Found", variant: "status-blue" },
  lost: { label: "Lost", variant: "status-red" },
  claimed: { label: "Claimed", variant: "status-amber" },
  resolved: { label: "Resolved", variant: "status-green" },
};

export const CLAIM_STATUS_CONFIG: Record<
  AdminClaimStatus,
  { label: string; variant: BadgeVariant }
> = {
  pending: { label: "Pending", variant: "status-amber" },
  approved: { label: "Approved", variant: "status-green" },
  rejected: { label: "Rejected", variant: "status-red" },
};

export const USER_ROLE_CONFIG: Record<
  UserRole,
  { label: string; variant: "status-green" | "status-amber" | "solid" }
> = {
  student: { label: "Student", variant: "status-amber" },
  staff: { label: "Staff", variant: "solid" },
  admin: { label: "Admin", variant: "status-green" },
};

// Item directory status (simpler set)
export const DIRECTORY_STATUS_CONFIG = {
  found: { label: "Found", variant: "status-green" as const },
  lost: { label: "Lost", variant: "status-red" as const },
};

// Category and status filter options
export const ITEM_CATEGORIES = [
  "All",
  "Electronics",
  "Keys",
  "Accessories",
  "Documents",
  "Medical",
  "Bags",
];
export const ITEM_STATUSES = ["All", "Found", "Lost"];
