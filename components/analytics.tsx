"use client";

import { useEffect } from "react";
import Script from "next/script";

const STORAGE_KEY = "crm-cookie-consent-v1";
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

type Consent = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  updatedAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function applyConsent(analytics: boolean) {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
  });
  if (analytics) {
    window.gtag?.("config", MEASUREMENT_ID, {
      anonymize_ip: true,
    });
  }
}

export function Analytics() {
  useEffect(() => {
    if (!MEASUREMENT_ID) return;

    ensureGtag();
    window.gtag?.("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });

    const saved = readConsent();
    if (saved) applyConsent(Boolean(saved.analytics));

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<Consent>).detail;
      applyConsent(Boolean(detail?.analytics));
    };
    window.addEventListener("crm-consent-changed", onChange);
    return () => window.removeEventListener("crm-consent-changed", onChange);
  }, []);

  if (!MEASUREMENT_ID) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        ensureGtag();
        window.gtag?.("js", new Date());
        const saved = readConsent();
        applyConsent(Boolean(saved?.analytics));
      }}
    />
  );
}
