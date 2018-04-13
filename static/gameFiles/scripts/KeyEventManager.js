"use strict";

import LogMessage from "./debug/MessageLogger";

export default class KeyEventManager {
    constructor() {
        LogMessage("create KeyEventManager");
        this.keyDownCallback = null;
        this.keyUpCallback = null;
    }

    initKeyDown(keyDownCallback) {
        this.keyDownCallback = keyDownCallback;
    }

    initKeyUp(keyUpCallback) {
        this.keyUpCallback = keyUpCallback;
    }

    addEvents() {
        window.onkeydown = (event) => {
            this.keyDownCallback(event);
        };

        window.onkeyup = (event) => {
            this.keyUpCallback(event);
        };
    }
}
