"use strict";

import LogMessage from "./MessageLogger";

const START_SPEED = 12;
const DELTA_SPEED = 0.2;
const MAX_SPEED = 50;

export default class SpeedController {
    constructor() {
        this.speed = 0;
    }

    setSpeed() {
        this.speed = START_SPEED;
    }

    printSpeedInfo() {
        LogMessage("Speed: " + this.speed);
    }

    controlSpeed() {
        if (this.speed < MAX_SPEED) {
            this.speed += DELTA_SPEED;
        }
    }

    getSpeed() {
        return this.speed;
    }
}
