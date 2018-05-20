"use strict";

const FULL = 1;
const MIDDLE = 0.5;
const WAIT = 2000;

export default class ZoomManager {
    constructor() {
        ZoomManager.resizeAction();
        this.addResizeEvent();

        let zoomInterval = setInterval(() => {
            ZoomManager.resizeAction();
        }, WAIT);
    }

    static resizeAction() {
        const styleObj = getComputedStyle(document.body);
        const heightBody = parseInt(styleObj.height);
        const heightClient = parseInt(document.documentElement.clientHeight);
        if(heightBody < heightClient) {
            document.body.style.zoom = FULL.toString();
        } else {
            document.body.style.zoom = MIDDLE.toString();
        }
    }

    addResizeEvent() {
        window.onresize = ()=> {
            ZoomManager.resizeAction();
        };
    }
}
