"use strict";

import LogMessage from "../../gameFiles/scripts/MessageLogger";

const WAIT = 500;

export default class ZoomManager {
    constructor() {
        ZoomManager.resizeAction();
        this.addResizeEvent();

        let oldBody = document.body.innerHTML;

        setInterval(() => {
            if (oldBody !== document.body.innerHTML) {
                oldBody = document.body.innerHTML;
                ZoomManager.resizeAction();
            }
        }, WAIT);
    }

    static getParams() {
        return {
            bodyHeight: parseInt(getComputedStyle(document.body).height),
            clientHeight: parseInt(document.documentElement.clientHeight),
        };
    }

    static resizeAction() {
        LogMessage("Resize ACTION");
        const params = ZoomManager.getParams();
        const k = params.clientHeight / params.bodyHeight;
        document.body.style.zoom = k.toString();
    }

    addResizeEvent() {
        window.onresize = () => {
            ZoomManager.resizeAction();
        };
    }
}
