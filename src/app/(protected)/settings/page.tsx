"use client";

import { Bell, Eye, Globe, Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  NotificationsTab,
  PrivacyTab,
  AppearanceTab,
  SecurityTab,
} from "@/components/settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
          Account
        </p>
        <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
          Settings.
        </h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notifications" variant="underline">
        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-5 py-4">
          <TabsList>
            <TabsTrigger
              value="notifications"
              icon={<Bell className="w-3.5 h-3.5" />}
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" icon={<Eye className="w-3.5 h-3.5" />}>
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              icon={<Globe className="w-3.5 h-3.5" />}
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="security"
              icon={<Shield className="w-3.5 h-3.5" />}
            >
              Security
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="privacy">
          <PrivacyTab />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
