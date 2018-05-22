"use strict";

export default function gameOverRender(obj) {
    document.querySelector(".multiplayer-page__wait-process-label").innerHTML = obj.gameOver.toString();
    document.querySelector(".multiplayer-page__wait-process-label").hidden = false;
}
