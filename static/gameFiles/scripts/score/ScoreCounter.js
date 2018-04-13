"use strict";

const DELTA_SCORE = 0.05;

export default class ScoreCounter {
    constructor() {
        this.scorePoints = 0;
    }

    initScore(value) {
        this.scorePoints = value;
    }

    addDeltaScore() {
        this.scorePoints += DELTA_SCORE;
    }

    getScore() {
        return this.scorePoints;
    }
}
