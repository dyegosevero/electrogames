"use client";

import { createContext, useContext, type ReactNode } from "react";

type SiteSettings = {
  whatsapp_phone: string;
  webhook_url: string;
};

const SettingsContext = createContext<SiteSettings>({
  whatsapp_phone: "5500000000000",
  webhook_url: "",
});

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SettingsContext);
}
