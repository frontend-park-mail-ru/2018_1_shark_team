"use strict";

export default class ZoomManager {
    constructor() {
        ZoomManager.resizeAction();
        this.addResizeEvent();
    }

    static resizeAction() {
        let zoomValue = 1;
        const styleObj = getComputedStyle(document.body);
        const heightBody = parseInt(styleObj.height);
        const heightClient = parseInt(window.clientHeight);
        const scaleY = (heightClient / heightBody) * 100;
        zoomValue = (zoomValue / scaleY) * 100;
        document.body.style.zoom = zoomValue.toString();
    }

    addResizeEvent() {
        window.onresize = ()=> {
            ZoomManager.resizeAction();
        };
    }
}
