
self.addEventListener("install", (event) => {
  self.skipWaiting(); // active immédiatement
  event.waitUntil(
    caches.open("v2").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./manifest.json",
        "./icon.png"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim()); // prend le contrôle direct
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});