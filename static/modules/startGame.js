"use strict";

import Game from "./../gameFiles/scripts/Game";

export default function startGame() {
    document.querySelector(".one-player-page__start-game-button").hidden = true;
    document.querySelector(".canvas-box__canvas-plain").style.opacity = 1;
    new Game();
}
