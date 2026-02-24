"use client";

import { SettingsSection, SwitchRow, SelectRow } from "./SettingsSection";

export function PrivacyTab() {
  return (
    <div className="space-y-5">
      <SettingsSection
        title="Profile visibility"
        description="Control who can see your information."
      >
        <SelectRow
          label="Profile visibility"
          description="Who can view your name and profile on CampusClaim."
          options={[
            { value: "public", label: "All verified users" },
            { value: "connected", label: "Only during active claims" },
            { value: "private", label: "Completely private" },
          ]}
          defaultValue="public"
        />
        <SwitchRow
          label="Show hostel / room number"
          description="Display your room number to finders during active claims."
          defaultChecked
        />
        <SwitchRow
          label="Show phone number"
          description="Share your phone number with finders when a claim is approved."
        />
        <SwitchRow
          label="Appear in search"
          description="Let other users find you by name when assigning finders."
          defaultChecked
        />
      </SettingsSection>

      <SettingsSection
        title="Data & activity"
        description="Control how your data is used."
      >
        <SwitchRow
          label="Anonymise resolved reports"
          description="After an item is returned, remove your name from the public listing."
        />
        <SwitchRow
          label="Activity status"
          description="Show other users when you were last active."
          defaultChecked
        />
        <SwitchRow
          label="Analytics opt-in"
          description="Help improve CampusClaim by sharing anonymous usage data."
          defaultChecked
        />
      </SettingsSection>
    </div>
  );
}
