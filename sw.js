self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Only handle same-origin requests; let the browser handle cross-origin
  // fetches natively so CORS proxy requests from the page are not intercepted.
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(fetch(event.request));
});
