const CACHE_NAME = "esportes-v2"; // Troque o número sempre que quiser forçar update
const urlsToCache = ["index.html", "manifest.json"];

// Instalação do Service Worker
self.addEventListener("install", event => {
  self.skipWaiting(); // Força o novo SW a ser ativado imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação do SW - limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  return self.clients.claim(); // Força todas as abas a usarem o novo SW
});

// Intercepta os requests e responde com cache ou fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
