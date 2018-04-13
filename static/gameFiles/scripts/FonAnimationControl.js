"use strict";

import LogMessage from "./debug/MessageLogger";

const FON_IMAGE_WIDTH = 1000;
const FON_IMAGE_HEIGHT = 700;
const FON_X = -50;
const FON_Y = -50;
const DELTA_ANGLE = 0.01;
const MAX_ANGLE = 4 * Math.PI;
const FON_RADIUS = 30;

export default class FonAnimationControl {
    constructor() {
        LogMessage("create FonAnimationControl");
        this.angle = 0;
    }

    initFonAngle(angle) {
        this.angle = angle;
    }

    addDeltaAngle() {
        this.angle += DELTA_ANGLE;
    }

    controlAngleValue() {
        if(this.angle > MAX_ANGLE) {
            this.angle = 0;
        }
    }

    findNewFonPosition() {
        this.fonX = FON_X + Math.cos(this.angle) * FON_RADIUS;
        this.fonY = FON_Y + Math.sin(this.angle) * FON_RADIUS;
    }

    getFonX() {
        return this.fonX;
    }

    getFonY() {
        return this.fonY;
    }

    static getFonImageWidth() {
        return FON_IMAGE_WIDTH;
    }

    static getFonImageHeight() {
        return FON_IMAGE_HEIGHT;
    }
}
