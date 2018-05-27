"use strict";

import template from "./one-player-page.pug";
import startGame from "../../gameFiles/scripts/startGame";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class OnePlayerPage {
    constructor() {
        OnePlayerPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        LogMessage("Router: " + router);
        document.querySelector(".one-player-page__start-game-button").addEventListener("click", () => {
            startGame();
        });
    }
}
