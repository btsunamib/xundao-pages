'use strict';
const PREFIX = 'xundao-'+self.registration.scope+'-';
const CACHE = PREFIX+'v1.0.0';
const FILES = ['.', 'index.html', 'styles.css', 'art.js', 'engine.js', 'app.js', 'favicon.svg', 'manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy))); } return response; }).catch(() => caches.match(event.request).then(response => response || caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(event.request).then(cached => { const network = fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy))); } return response; }); if (cached) { event.waitUntil(network.catch(() => {})); return cached; } return network; }));
  }
});
