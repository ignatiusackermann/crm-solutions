"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { CookieConsent } from "./cookie-consent";
import { SiteMotion } from "./site-motion";
import { SmoothScroll } from "./smooth-scroll";
import { VoiceBusinessAdvisor } from "./voice-business-advisor";

export function SiteExperience() {
  const pathname = usePathname();
  const isPrivateArea = pathname.startsWith("/admin") || pathname.startsWith("/client");
  if (isPrivateArea) return null;

  return (
    <>
      <SmoothScroll />
      <SiteMotion />
      <Analytics />
      <CookieConsent />
      <VoiceBusinessAdvisor />
    </>
  );
}
