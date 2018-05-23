"use strict";

import template from "./main-menu-page.pug";
import ExitManager from "../../modules/network/ExitManager";

export default class MainMenuPage {
    constructor() {
        MainMenuPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        document.querySelector(".form__exit-button").addEventListener("click", () => {
            new ExitManager().exitFromSystem();
        });

        document.querySelector(".form__about-authors-button").addEventListener("click", () => {
            router.moveToPage("/about-authors");
        });

        document.querySelector(".form__game-rules-button").addEventListener("click", () => {
            router.moveToPage("/game-rules");
        });

        document.querySelector(".form__my-page-button").addEventListener("click", () => {
            router.moveToPage("/my-page");
        });

        document.querySelector(".form__leaderboard-button").addEventListener("click", () => {
            router.moveToPage("/liders-page");
        });

        document.querySelector(".form__single-player-game-button").addEventListener("click", () => {
            router.moveToPage("/one-player-page");
        });

        document.querySelector(".form__chat-button").addEventListener("click", () => {
            router.moveToPage("/chat-page");
        });

        document.querySelector(".form__multiplayer-game-button").addEventListener("click", () => {
            router.moveToPage("/multiplayer-page");
        });
    }
}
