"use strict";

import template from "./multiplayer-page.pug";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import multiplayerGame from "../../multiplayerGameFiles/multiplayerGame";

export default class MultiplayerPage {
    constructor() {
        MultiplayerPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements() {
        document.querySelector(".multiplayer-page__main-menu-button").onclick = () => {
            window.location = "/main-menu";
        };

        document.querySelector(".multiplayer-page__start-game-finding-button").onclick = () => {
            LogMessage("START fining enemy multiplayer");
            multiplayerGame();
        };
    }
}
