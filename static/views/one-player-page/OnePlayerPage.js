"use strict";

import template from "./one-player-page.pug";
import startGame from "../../gameFiles/scripts/startGame";

export default class OnePlayerPage {
    constructor() {
        OnePlayerPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        document.querySelector(".one-player-page__main-menu-button").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });

        document.querySelector(".one-player-page__start-game-button").addEventListener("click", () => {
            startGame();
        });
    }
}
