import {
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ShieldCheck,
} from "lucide-react";

type ClaimStatusKey =
  | "pending"
  | "reviewing"
  | "approved"
  | "rejected"
  | "completed";

export const CLAIM_STATUS: Record<
  ClaimStatusKey,
  {
    label: string;
    variant:
      | "status-green"
      | "status-amber"
      | "status-blue"
      | "status-red"
      | "solid";
    icon: React.ReactNode;
    description: string;
  }
> = {
  pending: {
    label: "Pending",
    variant: "status-amber",
    icon: <Clock className="w-3.5 h-3.5" />,
    description: "Waiting for the finder to review.",
  },
  reviewing: {
    label: "Reviewing",
    variant: "status-blue",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    description: "The finder is actively reviewing your claim.",
  },
  approved: {
    label: "Approved",
    variant: "status-green",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    description: "Claim approved! Arrange a handoff with the finder.",
  },
  rejected: {
    label: "Rejected",
    variant: "status-red",
    icon: <XCircle className="w-3.5 h-3.5" />,
    description: "The finder could not verify your description.",
  },
  completed: {
    label: "Completed",
    variant: "status-green",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    description: "Item successfully returned to you.",
  },
};
