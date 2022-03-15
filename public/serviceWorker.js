const staticNicksPlayground = "nicks-playground-site-v1";
const assets = [
  "/",
  "/index.html",
	"/404.html",
  "/styles.css",
  "/script.js",
  "/images/logo.svg",
	"/images/icon-192x192.png",
  "/images/profile.webp",
  "/images/charlie.webp",
  "/audio/bensound-memories.mp3",
  "/audio/Clink.ogg",
  "/audio/Strum.ogg",
  "/audio/Trill.ogg",
	"/revuc16/index.html",
	"/school/vrpertable/index.html"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticNicksPlayground)
			.then(function(cache) {
				console.log('Opened cache');
      	return cache.addAll(assets);
    	})
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
			.then(function(response) {
				if (response) {
          return response;
        }
        return fetch(event.request);
    	})
  );
});
