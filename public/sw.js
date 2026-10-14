const CACHE_NAME = "encuentraq-v1";
const urlsToCache = [
  "/encuentraq-web/",
  "/encuentraq-web/index.html",
  "/encuentraq-web/favicon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn("Some cache items failed to load during install", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then((res) => {
          return res;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/encuentraq-web/index.html");
          }
        });
    })
  );
});
