const CACHE_NAME = "codex-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/codex/",
  "/codex/index.html",
  "/codex/styles/base.css",
  "/codex/icons/favicon.png",
  "/codex/images/paper.png",
  "/codex/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
