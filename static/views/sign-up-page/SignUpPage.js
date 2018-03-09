"use strict";

import template from "./sign-up-page.pug";
import SignupFormValidator from "../../modules/SignupFormValidator";

export default class SignUpPage {
    constructor() {
        SignUpPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".sign-up-page__link-to-log-in-page").addEventListener("click", () => {
            router.moveToPage("/log-in");
        });

        document.querySelector(".form__sign-up-button").addEventListener("click", () => {
            new SignupFormValidator(router, elementsBase).validateSignupForm();
        });
    }
}
