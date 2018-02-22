"use strict";

import LogInPage from "../views/log-in-page/LogInPage";
import "../views/log-in-page/log-in-page.scss";

import SignUpPage from "../views/sign-up-page/SignUpPage";
import "../views/sign-up-page/sign-up-page.scss";

import MainMenuPage from "../views/main-menu-page/MainMenuPage";
import "../views/main-menu-page/main-menu-page.scss";

import Router from "./Router";
import ElementsBase from "./ElementsBase";

class Start {
    constructor() {
        this.createPages();
        this.createAndInitRouter();
        this.createAndInitElementsBase();
        this.addEventsToElements();
    }

    createPages() {
        this.logInPage = new LogInPage();
        this.signInPage = new SignUpPage();
        this.mainMenuPage = new MainMenuPage();
    }

    createAndInitRouter() {
        this.router = new Router();
        this.router.addPage("/log-in", document.querySelector(".log-in-page"));
        this.router.addPage("/sign-up", document.querySelector(".sign-up-page"));
        this.router.addPage("/main-menu", document.querySelector(".main-menu-page"));
        this.router.showPage();
    }

    createAndInitElementsBase() {
        this.elementsBase = new ElementsBase();

        this.elementsBase.addElement("signUpLoginField", document.querySelector(".sign-up-page__form .form__login-input-field"));
        this.elementsBase.addElement("signUpPasswordField", document.querySelector(".sign-up-page__form .form__password-input-field"));
        this.elementsBase.addElement("signUpMessageBox", document.querySelector(".sign-up-page__message-box"));

        this.elementsBase.addElement("logInLoginField", document.querySelector(".log-in-page__form .form__login-input-field"));
        this.elementsBase.addElement("logInPasswordField", document.querySelector(".log-in-page__form .form__password-input-field"));
        this.elementsBase.addElement("logInMessageBox", document.querySelector(".log-in-page__message-box"));
    }

    addEventsToElements() {
        LogInPage.addEventsToElements(this.router, this.elementsBase);
        SignUpPage.addEventsToElements(this.router, this.elementsBase);
    }
}

window.addEventListener("load", () => {
    new Start();
});
