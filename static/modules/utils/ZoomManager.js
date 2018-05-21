"use strict";

import LogMessage from "../../gameFiles/scripts/MessageLogger";

const ZOOM_VALUE = 0.5;

export default class ZoomManager {
    constructor() {
        document.body.style.zoom = ZOOM_VALUE.toString();
        LogMessage("Set zoom OK");
    }
}
