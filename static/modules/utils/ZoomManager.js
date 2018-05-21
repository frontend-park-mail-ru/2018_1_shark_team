"use strict";

const WAIT = 500;

export default class ZoomManager {
    constructor() {
        ZoomManager.resizeAction();
        this.addResizeEvent();

        let oldBody = document.body.innerHTML;

        let zoomInter = setInterval(() => {
            if(oldBody !== document.body.innerHTML) {
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
