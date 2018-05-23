"use strict";

import Game from "./Game";

export default function startGame() {
    document.querySelector(".one-player-page__canvas-box").hidden = false;
    document.querySelector(".one-player-page__start-game-button").hidden = true;
    document.querySelector(".canvas-box__canvas-plain").style.opacity = 1;
    new Game();
}
