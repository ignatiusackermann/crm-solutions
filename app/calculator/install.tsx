"use client";

import { useEffect, useState } from "react";

/* Registers the service worker and offers an install button.
   Chrome, Edge and Android fire `beforeinstallprompt`, which we catch and
   replay when the button is pressed. iOS Safari does not, so there we show
   the Share → Add to Home Screen instruction instead. */

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallApp() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/calculator-sw.js", { scope: "/calculator" })
        .catch(() => {});
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    setIsIos(/iphone|ipad|ipod/i.test(window.navigator.userAgent));

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  if (prompt) {
    return (
      <button
        type="button"
        className="button button-copper calc-install"
        onClick={async () => {
          await prompt.prompt();
          await prompt.userChoice;
          setPrompt(null);
        }}
      >
        Install the free calculator <span aria-hidden="true">↓</span>
      </button>
    );
  }

  if (isIos) {
    return (
      <p className="calc-install-hint">
        To keep this on your phone: tap <strong>Share</strong>, then{" "}
        <strong>Add to Home Screen</strong>.
      </p>
    );
  }

  return null;
}
