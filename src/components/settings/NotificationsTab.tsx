"use client";

import { SettingsSection, SwitchRow, SelectRow } from "./SettingsSection";

export function NotificationsTab() {
  return (
    <div className="space-y-5">
      <SettingsSection
        title="Email notifications"
        description="Choose which events send you an email."
      >
        <SwitchRow
          label="Claim submitted on my item"
          description="When someone submits a claim on an item you reported found."
          defaultChecked
        />
        <SwitchRow
          label="Claim approved / rejected"
          description="Status updates on claims you've submitted."
          defaultChecked
        />
        <SwitchRow
          label="New match found"
          description="When a found item closely matches something you reported lost."
          defaultChecked
        />
        <SwitchRow
          label="Handoff reminders"
          description="24-hour reminders when a handoff is pending."
          defaultChecked
        />
        <SwitchRow
          label="Weekly digest"
          description="A weekly summary of new items near your campus locations."
        />
      </SettingsSection>

      <SettingsSection
        title="Push notifications"
        description="Browser and mobile push alerts."
      >
        <SwitchRow
          label="Enable push notifications"
          description="Allow CampusClaim to send browser notifications."
          defaultChecked
        />
        <SwitchRow
          label="Urgent alerts only"
          description="Only notify for approved claims and handoffs."
        />
      </SettingsSection>

      <SettingsSection
        title="Notification frequency"
        description="Control how often you receive batched summaries."
      >
        <SelectRow
          label="Summary frequency"
          description="How often to batch non-urgent notifications."
          options={[
            { value: "realtime", label: "Real-time (instant)" },
            { value: "hourly", label: "Hourly digest" },
            { value: "daily", label: "Daily digest" },
            { value: "weekly", label: "Weekly digest" },
          ]}
          defaultValue="realtime"
        />
      </SettingsSection>
    </div>
  );
}
