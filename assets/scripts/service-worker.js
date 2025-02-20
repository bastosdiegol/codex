const CACHE_NAME = "codex-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/codex/",
  "/codex/assets/html/index.html",
  "/codex/assets/html/app.html",
  "/codex/assets/styles/base.css",
  "/codex/assets/styles/header.css",
  "/codex/assets/styles/main.css",
  "/codex/assets/styles/footer.css",
  "/codex/assets/styles/media-queries.css",
  "/codex/assets/icons/add-book-icon.png",
  "/codex/assets/icons/chatbot-icon.png",
  "/codex/assets/icons/favicon.png",
  "/codex/assets/icons/logout-icon.png",
  "/codex/assets/icons/sort-icon.png",
  "/codex/assets/images/codex.png",
  "/codex/assets/images/paper.png",
  "/codex/assets/scripts/app.js",
  "/codex/assets/scripts/chatbot.js",
  "/codex/assets/scripts/firebase.js",
  "/codex/assets/scripts/menu.js",
  "/codex/assets/scripts/sign-in.js",
  "/codex/assets/scripts/utility.js",
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
