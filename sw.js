const CACHE_NAME = 'drum-tuner-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install the service worker and save the files to offline memory
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept network requests and serve the offline version if the internet is down
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached version if found, otherwise try to fetch from the internet
        return response || fetch(event.request);
      })
  );
});
