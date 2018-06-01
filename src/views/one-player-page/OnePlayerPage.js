"use strict";

import template from "./one-player-page.pug";
import startGame from "../../gameFiles/scripts/startGame";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import {pushSingleMenuView} from "../../util/view-util";

export default class OnePlayerPage {
    constructor() {
    }

    render() {
        pushSingleMenuView(template());
    }

    addEventsToElements(router) {
        LogMessage("Router: " + router);
        document.querySelector(".one-player-page__start-game-button").addEventListener("click", (e) => {
            e.target.textContent = "🔄";
            e.target.classList.add("one-player-page__start-game-button--restart");
            setTimeout(() => startGame(), 150);
        });
    }
}
