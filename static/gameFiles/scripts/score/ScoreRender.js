"use strict";

export default class ScoreRender {
    constructor() {
        this.countLabel = undefined;
    }

    initCountLabel(countLabel) {
        this.countLabel = countLabel;
    }

    printScore(value) {
        this.countLabel.innerHTML = value.toString();
    }
}
