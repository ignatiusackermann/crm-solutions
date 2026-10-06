/* Service worker for the installable Client Value Calculator.
   Scope is /calculator only — the rest of the site is untouched and keeps
   loading from the network as normal.

   Strategy: network first, fall back to the cached copy. That way the app
   updates itself whenever the person is online, and still opens on a plane
   or with no signal. */

const CACHE = "client-value-calculator-v1";
const SHELL = [
  "/calculator",
  "/manifest.webmanifest",
  "/brand/crm-solutions-icon-192.png",
  "/brand/crm-solutions-icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const wanted =
    url.pathname === "/calculator" ||
    url.pathname.startsWith("/calculator/") ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/brand/") ||
    url.pathname === "/manifest.webmanifest";
  if (!wanted) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then((hit) => hit || caches.match("/calculator"))),
  );
});
