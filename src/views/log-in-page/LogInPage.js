"use strict";

import template from "./log-in-page.pug";
import LoginFormValidator from "../../modules/LogIn/service/LoginFormValidator";
import {pushDoubleMenuView} from "../../util/view-util";

export default class LogInPage {
    constructor() {
    }

    render() {
        pushDoubleMenuView(template());
    }

    addEventsToElements(router) {
        document.querySelector(".form__log-in-button").addEventListener("click", () => {
            new LoginFormValidator(router).validateLoginForm();
        });
    }
}
