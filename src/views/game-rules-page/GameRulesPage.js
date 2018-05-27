"use strict";

import template from "./game-rules-page.pug";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class GameRulesPage {
    constructor() {
        GameRulesPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        LogMessage("Router: " + router);
    }
}