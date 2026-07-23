"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "crm-cookie-consent-v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  updatedAt: string;
};

function saveConsent(analytics: boolean, preferences: boolean) {
  const consent: Consent = {
    necessary: true,
    analytics,
    preferences,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("crm-consent-changed", { detail: consent }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(!localStorage.getItem(STORAGE_KEY));
    });
    const open = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const consent = JSON.parse(saved) as Consent;
          setAnalytics(Boolean(consent.analytics));
          setPreferences(Boolean(consent.preferences));
        } catch {}
      }
      setManaging(true);
      setVisible(true);
    };
    window.addEventListener("crm-open-cookie-settings", open);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("crm-open-cookie-settings", open);
    };
  }, []);

  const commit = (nextAnalytics: boolean, nextPreferences: boolean) => {
    saveConsent(nextAnalytics, nextPreferences);
    setVisible(false);
    setManaging(false);
  };

  if (!visible) return null;

  return (
    <section className={`cookie-banner ${managing ? "managing" : ""}`} aria-label="Cookie preferences">
      <div className="cookie-mark" aria-hidden="true"><span /><span /><span /></div>
      <div className="cookie-copy">
        <p className="cookie-eyebrow">Your privacy choices</p>
        <h2>{managing ? "Choose what this site may remember." : "We respect your attention—and your privacy."}</h2>
        <p>Essential storage keeps secure site features and your choices working. Optional measurement helps us understand the customer journey. Nothing optional is enabled without your permission.</p>
        <Link href="/cookie-policy">Read the Cookie Policy</Link>
      </div>
      {managing && (
        <div className="cookie-options">
          <div>
            <span><strong>Essential</strong><small>Security, booking and saved privacy choices</small></span>
            <em>Always on</em>
          </div>
          <label>
            <span><strong>Analytics</strong><small>Anonymous journey and performance measurement</small></span>
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            <i aria-hidden="true" />
          </label>
          <label>
            <span><strong>Preferences</strong><small>Remember non-essential interface preferences</small></span>
            <input type="checkbox" checked={preferences} onChange={(event) => setPreferences(event.target.checked)} />
            <i aria-hidden="true" />
          </label>
        </div>
      )}
      <div className="cookie-actions">
        <button type="button" className="cookie-primary" onClick={() => commit(true, true)}>
          Accept optional cookies
        </button>
        <button type="button" onClick={() => commit(false, false)}>Essential only</button>
        {managing ? (
          <button type="button" onClick={() => commit(analytics, preferences)}>Save choices</button>
        ) : (
          <button type="button" onClick={() => setManaging(true)}>Manage preferences</button>
        )}
      </div>
    </section>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-cookie-button"
      onClick={() => window.dispatchEvent(new Event("crm-open-cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
