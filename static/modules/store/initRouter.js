"use strict";

export default function initRouter (router) {
    const arr = [
        ["/main-menu", ".main-menu-page"],
        ["/log-in", ".log-in-page"],
        ["/sign-up", ".sign-up-page"],
        ["/about-authors", ".about-authors-page"],
        ["/game-rules", ".game-rules-page"],
        ["/my-page", ".my-page"],
        ["/liders-page", ".liders-page"],
        ["/one-player-page", ".one-player-page"],
        ["/chat-page", ".chat-page"],
        ["/multiplayer-page", ".multiplayer-page"],
    ];

    arr.forEach((mass) => {
       const key = mass[0].toString();
       const value = mass[1].toString();
       router.addPage(key, document.querySelector(value));
    });
}
