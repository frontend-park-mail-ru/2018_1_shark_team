"use strict";

import template from "./main-menu-page.pug";
import ExitManager from "../../modules/network/ExitManager";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import {pushDoubleMenuView} from "../../util/view-util";

export default class MainMenuPage {
    constructor() {
    }

    render() {
        pushDoubleMenuView(template());
        this._drawLogin();
    }

    addEventsToElements(router) {
        document.querySelector(".form__exit-button").addEventListener("click", () => {
            LogMessage("Router: " + router);
            new ExitManager().exitFromSystem();
        });
    }

    _drawLogin() {
        document.querySelector(".main-menu-page__label").innerHTML = localStorage.getItem("loginValue");
    }
}
