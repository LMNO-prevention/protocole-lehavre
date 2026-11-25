// Fait uniquement ouvrir l'icône sans réseau (écran de lancement). L'application elle-même reste sur Apps Script.
var VERSION = 'protocole-lanceur-v6';
var FILES = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(req).then(function (r) {
    if (r && r.ok) { var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return r;
  }).catch(function () { return caches.match(req, { ignoreSearch: true }).then(function (m) { return m || caches.match('index.html'); }); }));
});
