self.addEventListener('fetch', function(event) {
  // Pass-through: enables PWA installability without altering network behaviour
  event.respondWith(fetch(event.request));
});
