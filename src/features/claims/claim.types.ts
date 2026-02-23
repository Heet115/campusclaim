export interface Claim {
  id: string;
  itemId: string;
  claimerId: string;
  status: "pending" | "approved" | "rejected";
  date: Date;
}
