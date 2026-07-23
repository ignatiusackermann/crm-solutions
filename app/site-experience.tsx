"use client";

import { usePathname } from "next/navigation";
import { CookieConsent } from "./cookie-consent";
import { VoiceBusinessAdvisor } from "./voice-business-advisor";

export function SiteExperience() {
  const pathname = usePathname();
  const isPrivateArea = pathname.startsWith("/admin") || pathname.startsWith("/client");
  if (isPrivateArea) return null;

  return (
    <>
      <CookieConsent />
      <VoiceBusinessAdvisor />
    </>
  );
}
