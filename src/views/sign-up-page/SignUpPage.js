"use strict";

import template from "./sign-up-page.pug";
import SignupFormValidator from "../../modules/SignUp/service/SignupFormValidator";

export default class SignUpPage {
    constructor() {
        SignUpPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".form__sign-up-button").addEventListener("click", () => {
            new SignupFormValidator(router, elementsBase).validateSignupForm();
        });
    }
}
