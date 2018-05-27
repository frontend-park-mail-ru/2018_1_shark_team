"use strict";

import template from "./main-menu-page.pug";
import ExitManager from "../../modules/network/ExitManager";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class MainMenuPage {
    constructor() {
        MainMenuPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        document.querySelector(".form__exit-button").addEventListener("click", () => {
            LogMessage("Router: " + router);
            new ExitManager().exitFromSystem();
        });
    }
}
