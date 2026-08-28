"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useSyncExternalStore } from "react";

const KEY = "crm-review-mode";

/**
 * A slim invitation bar shown only to people who arrived from the WhatsApp
 * launch campaign (?review=1). It is deliberately not a popup: normal visitors
 * never see it, and reviewers decide for themselves when they have seen enough
 * rather than being interrupted on a timer.
 *
 * The flag lives in sessionStorage so the bar survives navigation, and is read
 * through useSyncExternalStore — sessionStorage is an external system, and
 * subscribing to it is the correct primitive rather than setState in an effect.
 */

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((entry) => entry !== listener);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    // Private browsing can throw on storage access; the bar simply stays hidden.
    return false;
  }
}

function ReviewInviteInner() {
  const params = useSearchParams();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const active = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    if (params.get("review") !== "1") return;
    try {
      sessionStorage.setItem(KEY, "1");
      emit();
    } catch {
      // Nothing to do — without storage the bar cannot persist anyway.
    }
  }, [params]);

  if (!active || dismissed || pathname === "/review") return null;

  return (
    <div className="review-invite" role="complementary">
      <p>
        <strong>Reviewing this site for Ignatius?</strong> Look around first, then tell me what you
        found.
      </p>
      <div>
        <Link className="review-invite-cta" href="/review">
          Leave your review <span aria-hidden="true">→</span>
        </Link>
        <button type="button" onClick={() => setDismissed(true)} aria-label="Hide this bar">
          ✕
        </button>
      </div>
    </div>
  );
}

export function ReviewInvite() {
  return (
    <Suspense fallback={null}>
      <ReviewInviteInner />
    </Suspense>
  );
}
