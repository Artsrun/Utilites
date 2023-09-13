const CACHE_NAME = 'settings_cache';
const MAX_AGE = 3600000; // 1 hour in milliseconds

let urlsToCache = [
  '/',
  '/index.html',
  // And other static files you'd want to cache
  //... more assets
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(e.request);
      })
  );
});



self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(e.request);

      // If there's no match in the cache, fetch from the network
      if (!cachedResponse) {
        return fetchAndCache(e.request, cache);
      }

      const cachedData = await cachedResponse.json();

      // If the cache is old, fetch a fresh copy from the network
      if (Date.now() - cachedData.timestamp > MAX_AGE) {
        return fetchAndCache(e.request, cache);
      }

      // Otherwise, return the cached response
      return new Response(cachedData.data);
    })
  );
});

async function fetchAndCache(request, cache) {
  const response = await fetch(request);
  const responseData = await response.clone().text();
  
  const dataToCache = {
    timestamp: Date.now(),
    data: responseData
  };

  await cache.put(request, new Response(JSON.stringify(dataToCache)));


  
  
  
  
  
  
  
