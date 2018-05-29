"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

export default class FullScreenController {
    static openFullScreen() {
        const canvasObj = document.querySelector(".canvas-multiplayer-box__canvas-plain");
        try {
            canvasObj.webkitRequestFullscreen();
        } catch (err) {
            LogMessage("FullScreenError: " + err);
        }
    }

    static closeFullScreen() {
        try {
            document.webkitExitFullscreen();
        } catch (err) {
            LogMessage("FullScreenError: " + err);
        }
    }
}
