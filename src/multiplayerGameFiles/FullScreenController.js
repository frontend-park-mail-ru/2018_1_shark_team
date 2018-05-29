"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

export default class FullScreenController {
    static getCanvas() {
        LogMessage("GET CANVAS METHOD");
        return document.querySelector(".canvas-multiplayer-box__canvas-plain");
    }

    static openFullScreen() {
        LogMessage("OPEN FULL SCREEN");
        try {
            FullScreenController.getCanvas().webkitRequestFullscreen();
        } catch (err) {
            LogMessage("FullScreenError: " + err);
        }
    }

    static closeFullScreen() {
        LogMessage("CLOSE FULL SCREEN");
        try {
            document.webkitExitFullscreen();
        } catch (err) {
            LogMessage("FullScreenError: " + err);
        }
    }
}
