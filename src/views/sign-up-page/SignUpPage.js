"use strict";

import template from "./sign-up-page.pug";
import SignupFormValidator from "../../modules/SignUp/service/SignupFormValidator";
import {pushDoubleMenuView} from "../../util/view-util";

export default class SignUpPage {
    constructor() {
    }

    render() {
        pushDoubleMenuView(template());
    }

    addEventsToElements(router) {
        document.querySelector(".form__sign-up-button").addEventListener("click", () => {
            new SignupFormValidator(router).validateSignupForm();
        });
    }
}
