import {
  Smartphone,
  Key,
  BookOpen,
  ShoppingBag,
  Stethoscope,
  HelpCircle,
} from "lucide-react";

export const CATEGORY_OPTIONS = [
  {
    value: "electronics",
    label: "Electronics",
    icon: <Smartphone className="w-4 h-4" />,
  },
  { value: "keys", label: "Keys", icon: <Key className="w-4 h-4" /> },
  {
    value: "documents",
    label: "Documents",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    value: "accessories",
    label: "Accessories",
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    value: "medical",
    label: "Medical",
    icon: <Stethoscope className="w-4 h-4" />,
  },
  { value: "other", label: "Other", icon: <HelpCircle className="w-4 h-4" /> },
];

export const LOCATION_OPTIONS = [
  { value: "library", label: "Library" },
  { value: "cafeteria-a", label: "Cafeteria, Block A" },
  { value: "cafeteria-b", label: "Cafeteria, Block B" },
  { value: "engineering", label: "Engineering Block" },
  { value: "admin", label: "Admin Block" },
  { value: "sports", label: "Sports Complex" },
  { value: "medical", label: "Medical Sciences" },
  { value: "main-gate", label: "Main Gate" },
  { value: "hostel", label: "Hostel Area" },
  { value: "other", label: "Other / Not sure" },
];

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}
