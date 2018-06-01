"use strict";

import template from "./game-rules-page.pug";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import {pushDoubleMenuView} from "../../util/view-util";

export default class GameRulesPage {
    constructor() {
    }

    render() {
        pushDoubleMenuView(template());
    }

    addEventsToElements(router) {
        LogMessage("Router: " + router);
    }
}