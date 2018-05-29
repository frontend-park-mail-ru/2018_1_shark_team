"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

export default function touchFunc(event, goDown, goUp) {
    LogMessage("Touch procent count");
    const position = parseInt(event.touches[0].clientY);
    const height = parseInt(window.innerHeight);
    const procent = (position / height) * 100;
    if (procent >= 50) {
        goDown();
    } else {
        goUp();
    }
}
