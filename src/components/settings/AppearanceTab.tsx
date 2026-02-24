"use client";

import { useState } from "react";
import { Globe, Moon, Smartphone } from "lucide-react";
import { SettingsSection, SwitchRow, SelectRow } from "./SettingsSection";

export function AppearanceTab() {
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
