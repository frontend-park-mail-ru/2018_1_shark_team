"use strict";

import Game from "./Game";
import LogMessage from "./MessageLogger";
import AlertManager from "../../modules/render/AlertManager";

const MESSAGE_TEXT = "Переверните экран устройства. Пожалуйста.";

function controlScreenSize() {
    const height = parseInt(document.documentElement.clientHeight);
    const width = parseInt(document.documentElement.clientWidth);
    return width > height;
}

export default function startGame() {
    LogMessage("Start game function");
    ///////////////////////////////////////
    if(controlScreenSize()) {
        // width bigger height
        document.querySelector(".one-player-page__canvas-box").hidden = false;
        document.querySelector(".one-player-page__start-game-button").hidden = true;
        document.querySelector(".canvas-box__canvas-plain").style.opacity = 1;
        new Game();
    } else {
        // make user rotate screen
        new AlertManager().showAlertWindow(MESSAGE_TEXT, () => {
            LogMessage("Button ok pushed");
        });
    }
}
