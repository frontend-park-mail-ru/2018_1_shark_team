"use strict";

import template from "./log-in-page.pug";
import LoginFormValidator from "../../modules/LogIn/service/LoginFormValidator";

export default class LogInPage {
    constructor() {
        LogInPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".form__log-in-button").addEventListener("click", () => {
            new LoginFormValidator(router, elementsBase).validateLoginForm();
        });
    }
}
