"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

export default class TouchEventsController {
    static getCanvasElement() {
        LogMessage("Find canvas for two players");
        return document.querySelector(".canvas-multiplayer-box__canvas-plain");
    }

    static addTouchEvents(touchStartFunctionCallback, touchEndFunctionCallback) {
        const canvasObj = TouchEventsController.getCanvasElement();
        LogMessage("Add touch events");
        /////////////////////////////////////////////////////
        canvasObj.ontouchstart = (event) => {
            touchStartFunctionCallback(event);
        };
        /////////////////////////////////////////////////////
        canvasObj.ontouchend = () => {
            touchEndFunctionCallback();
        };
    }

    static dropTouchEvents() {
        const canvasObj = TouchEventsController.getCanvasElement();
        LogMessage("Drop touch events");
        /////////////////////////////////////////////////////
        canvasObj.ontouchstart = () => {
            LogMessage("Canvas TOUCH START Killed");
        };
        /////////////////////////////////////////////////////
        canvasObj.ontouchend = () => {
            LogMessage("Canvas TOUCH END Killed");
        };
    }
}
