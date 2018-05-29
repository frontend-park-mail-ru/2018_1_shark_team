"use strict";

import FullScreenController from "./FullScreenController";
import MusicManager from "../gameFiles/scripts/MusicManager";
import TouchEventsController from "./TouchEventsController";

export default function gameOverRender(obj) {
    const message = obj.gameOver.toString();
    if (message === "HERO_1_DEAD") {
        document.querySelector(".multiplayer-page__wait-process-label").innerHTML = "Игрок 2 победил";
    } else {
        document.querySelector(".multiplayer-page__wait-process-label").innerHTML = "Игрок 1 победил";
    }
    document.querySelector(".multiplayer-page__wait-process-label").hidden = false;
    FullScreenController.closeFullScreen();
    document.querySelector(".multiplayer-page__full-screen-button").hidden = true;
    // stop music
    MusicManager.stopMainClip();
    // stop touches
    TouchEventsController.dropTouchEvents();
}
