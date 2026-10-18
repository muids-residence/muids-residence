/* MUIDS Residence apps — service worker: network first, cached app shell as fallback */
const CACHE = 'muids-residence-v6';
const SHELL = ['parent.html', 'staff.html', 'index.html', 'config.js', 'muids-logo.png',
  'icon-parent-192.png', 'icon-staff-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // API calls go straight to Google
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
