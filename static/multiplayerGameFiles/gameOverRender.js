"use strict";

export default function gameOverRender(obj) {
    const message = obj.gameOver.toString();
    if(message === "HERO_1_DEAD") {
        document.querySelector(".multiplayer-page__wait-process-label").innerHTML = "Игрок 2 победил";
    } else {
        document.querySelector(".multiplayer-page__wait-process-label").innerHTML = "Игрок 1 победил";
    }
    document.querySelector(".multiplayer-page__wait-process-label").hidden = false;
}
