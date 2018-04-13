"use strict";

import Game from "./Game";
import LogMessage from "../debug/MessageLogger";

const START_OPACITY = 1;
const DELTA_OPACITY = 0.01;
const MIDDLE_OPACITY = 0.5;

const WAIT_TIME_INTEVAL = 35;

export default function startAnimationOpacity(game, callback) {
    const canvasBox = document.querySelector(".canvas-box__canvas-plain");
    let opacity = START_OPACITY;
    LogMessage("=== START OPACITY INTERVAL ===");
    game.opacityInterval = setInterval(() => {
        canvasBox.style.opacity = opacity.toString();
        opacity -= DELTA_OPACITY;
        LogMessage("Opacity: " + opacity);
        if(opacity <= MIDDLE_OPACITY) {
            clearInterval(game.opacityInterval);
            LogMessage("=== STOP OPACITY INTERVAL ===");
            Game.renderRestartBtn();
        }
    }, WAIT_TIME_INTEVAL);
}
