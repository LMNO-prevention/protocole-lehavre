// Service worker : l'application s'ouvre même sans réseau.
// Changer VERSION à chaque mise à jour des fichiers pour que les tablettes rechargent la nouvelle version.
var VERSION = 'protocole-v2';
var FILES = ['./', 'index.html', 'config.js', 'plan.jpg', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

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
  if (req.method !== 'GET' || url.origin !== location.origin) return;       // les appels vers Apps Script ne passent pas par le cache
  e.respondWith(
    fetch(req).then(function (r) {                                           // réseau d'abord : les mises à jour arrivent dès qu'il y a du wifi
      if (r && r.ok) { var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return r;
    }).catch(function () {                                                   // hors ligne : version en cache
      return caches.match(req, { ignoreSearch: true }).then(function (m) { return m || caches.match('index.html'); });
    })
  );
});
