const staticNicksPlayground = "nicks-playground-site-v1";
const assets = [
  "/",
  "/index.html",
	"/404.html",
  "/static/css/styles.css",
  "/static/js/entrypoints/index.js",
  "/static/img/logo.svg",
	"/static/img/icon-192x192.png",
  "/static/img/profile.webp",
  "/static/img/harper.webp",
  "/static/audio/holiday-is-coming-11852.mp3",
  "/static/audio/notification_ambient.ogg",
  "/static/audio/state-change_confirm-down.ogg",
  "/static/audio/hero_simple-celebration-02.ogg",
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
