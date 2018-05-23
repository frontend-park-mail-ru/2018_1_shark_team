"use strict";

// eslint-disable-next-line no-undef
const CACHE_NAME = "funny_race_finish" + MY_VERSION;

// eslint-disable-next-line no-undef
const cacheUrls = MY_STRING;

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
            .then(
                () => {
                    this.skipWaiting();
                }
            )
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    let cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
    );
});
