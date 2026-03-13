const CACHE = 'resources-calc-v2';
const FILES = [
  './resources-calculator.html',
  './manifest.json',
  './icon.svg',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only handle same-origin requests; let the browser handle cross-origin
  // fetches natively so CORS proxy requests from the page are not intercepted.
  if (!e.request.url.startsWith(self.location.origin)) return;
  // Cache-first for same-origin assets
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
