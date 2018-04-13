"use strict";

// наименование для нашего хранилища кэша
const CACHE_NAME = 'funny_race_finish_1_2_3';

//////

const cacheUrls = [
  "/maxim",
  "/",
  "",
  "/main-menu",
  "/log-in",
  "/sign-up",
  "/about-authors",
  "/game-rules",
  "/my-page",
  "/liders-page",
  "/one-player-page",
  "/chat-page",
  "output/babel_output/result.js",
  "global.css",
  "index.html",
  "favicon.ico",
  "images/userImage.jpg",
  "gameFiles/images/enemyOK.png",
  "gameFiles/images/fonOK.png",
  "gameFiles/images/rocketOK.png",
  "gameFiles/images/star.png",
]
;

//////

self.addEventListener("install", function (event) {
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
            .then(
                // сразу активируем текущую версию
                () => {
                    this.skipWaiting();
                }
            )
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches.match(event.request).then(function (cachedResponse) {
            // выдаём кэш, если он есть
            if (cachedResponse) {
                return cachedResponse;
            }
            // иначе запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
});

// Promise переданный в waitUntil() заблокирует другие события до своего завершения,
// поэтому можно быть уверенным, что процесс очистки закончится раньше,
// чем выполнится первое событие fetch на новом кеше.
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
