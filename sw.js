const CACHE_NAME = 'albirru-scoring-v1';
const urlsToCache = [
'./',
'./index.html',
'./manifest.json',
'./icon-192.png',
'./icon-512.png'
];

// Install Service Worker dan simpan file ke cache
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log('Cache berhasil dibuka');
return cache.addAll(urlsToCache);
})
);
});

// Ambil data dari cache saat offline
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
// Jika ada di cache, tampilkan. Jika tidak, ambil dari internet
return response || fetch(event.request);
})
);
});

// Update Service Worker dan hapus cache versi lama jika ada pembaruan kode
self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
);
});