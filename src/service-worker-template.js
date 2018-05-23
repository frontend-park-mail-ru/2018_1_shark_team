"use strict";

// eslint-disable-next-line no-undef
const CACHE_NAME = "funny_race_finish" + MY_VERSION;

// eslint-disable-next-line no-undef
const cacheUrls = MY_STRING;

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList => {
                const cachesToDelete = keyList.filter(key => cacheWhitelist.indexOf(key) === -1);
                return Promise.all(
                    cachesToDelete.map(key => caches.delete(key))
                );
            })
    );
});
