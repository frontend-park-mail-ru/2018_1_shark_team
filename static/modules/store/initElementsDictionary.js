"use strict";

import ElementsBase from "../utils/ElementsBase";

export default function initElementsDictionary() {
    const elementsBase = new ElementsBase();

    const arr = [
        ["signUpLoginField", ".sign-up-page__form .form__login-input-field"],
        ["signUpPasswordField", ".sign-up-page__form .form__password-input-field"],
        ["signUpMessageBox", ".sign-up-page__message-box"],
        ["logInLoginField", ".log-in-page__form .form__login-input-field"],
        ["logInPasswordField", ".log-in-page__form .form__password-input-field"],
        ["logInMessageBox", ".log-in-page__message-box"],
        ["mainMenuLoginLabel", ".main-menu-page__label"],
        ["myPageLoginLabel", ".my-page__user-login-label"],
        ["fileInputHiddenBtn", ".form__file-button"],
        ["userAvatarImage", ".form__user-avatar-image"],
        ["myPageMessageBox", ".my-page__message-box"],
        ["lidersPageLoginLabel", ".liders-page__login-label"],
        ["lidersBox", ".liders-page__liders-list-box"],
        ["chatInputField", ".chat-page__input-field"],
        ["chatMessageBox", ".chat-page__messages-box"],
    ];

    arr.forEach((mass) => {
        const key = mass[0].toString();
        const value = mass[1].toString();
        elementsBase.addElement(key, document.querySelector(value));
    });

    return elementsBase;
}
