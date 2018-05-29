"use strict";

const HIDE_VALUE = true;

export default function showGameCanvas() {
    document.querySelector(".multiplayer-page__start-game-finding-button").hidden = HIDE_VALUE;
    document.querySelector(".multiplayer-page__wait-process-label").hidden = HIDE_VALUE;
    document.querySelector(".multiplayer-page__canvas-multiplayer-box").hidden = !HIDE_VALUE;
    document.querySelector(".multiplayer-page__full-screen-button").hidden = !HIDE_VALUE;
}
