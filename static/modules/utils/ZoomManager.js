"use strict";

import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class ZoomManager {
    constructor() {
        ZoomManager.resizeAction();
        this.addResizeEvent();
    }

    static resizeAction() {
        let zoomValue = 1;
        const styleObj = getComputedStyle(document.body);
        const heightBody = parseInt(styleObj.height);
        const heightClient = parseInt(document.documentElement.clientHeight);

        document.body.style.zoom = zoomValue.toString();
    }

    addResizeEvent() {
        window.onresize = ()=> {
            ZoomManager.resizeAction();
        };
    }
}
