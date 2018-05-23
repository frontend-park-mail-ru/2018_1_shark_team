"use strict";

const CACHE_NAME = 'maxim_4';

const cacheUrls = [
    "gameFiles/images/ammo.png",
    "gameFiles/images/ballOK.png",
    "gameFiles/images/bonusLive.png",
    "gameFiles/images/enemyOK.png",
    "gameFiles/images/fonOK.png",
    "gameFiles/images/rocketOK.png",
    "gameFiles/images/star.png",

    "images/fon.png",
    "images/FunnyRace.png",
    "images/FunnyRace_mini.png",
    "images/rocket.png",
    "images/userImage.png",

    "favicon.ico",
    "global.scss",
];

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

self.addEventListener("activate", function(event) {
    let cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
    );
});
