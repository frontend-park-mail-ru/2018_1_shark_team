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
        /*
        document.querySelector(".log-in-page__link-to-sign-up-page").addEventListener("click", () => {
            router.moveToPage("/sign-up");
        });
        */

        document.querySelector(".form__log-in-button").addEventListener("click", () => {
            new LoginFormValidator(router, elementsBase).validateLoginForm();
        });
    }
}
