"use strict";

import StringContentManager from "./StringContentManager";
import AjaxWorker from "./AjaxWorker";

const message_signup_page = {
    MESSAGE_LOGIN_EMPTY: "Поле ввода логина пусто.",
    MESSAGE_LOGIN_BAD_CHARS: "Поле ввода логина содержит запретные символы.",
    MESSAGE_PASSWORD_EMPTY: "Поле ввода пароля пусто.",
    MESSAGE_PASSWORD_BAD_CHARS: "Поле ввода пароля содержит запретные символы."
};

export default class SignupFormValidator {
    constructor(router, elementsBase) {
        this.router = router;
        this.elementsBase = elementsBase;
    }

    validateSignupForm() {
        const router = this.router;
        const elementsBase = this.elementsBase;

        const login = elementsBase.getElement("signUpLoginField").value;
        const password = elementsBase.getElement("signUpPasswordField").value;

        const messageBox = elementsBase.getElement("signUpMessageBox");
        messageBox.innerHTML = "";

        const messageArr = [];

        if(login.length === 0) {
            messageArr.push(message_signup_page.MESSAGE_LOGIN_EMPTY);
        }

        if(new StringContentManager(login).normalString() === false) {
            messageArr.push(message_signup_page.MESSAGE_LOGIN_BAD_CHARS);
        }

        if(password.length === 0) {
            messageArr.push(message_signup_page.MESSAGE_PASSWORD_EMPTY);
        }

        if(new StringContentManager(password).normalString() === false) {
            messageArr.push(message_signup_page.MESSAGE_PASSWORD_BAD_CHARS);
        }

        for(let i = 0; i < messageArr.length; i++) {
            const message = messageArr[i];
            const p = document.createElement('p');
            p.innerHTML = message;
            messageBox.appendChild(p);
        }

        if(messageArr.length === 0) {
            new AjaxWorker("signup/", {
                loginField: login,
                passwordField: password
            }, (result) => {
                const message = JSON.parse(result).message;
                if(message === "YES") {
                    const h3 = document.createElement('h3');
                    h3.innerHTML = "Регистрация прошла успешно.";
                    messageBox.appendChild(h3);
                }
                if(message === "NO") {
                    const h3 = document.createElement('h3');
                    h3.innerHTML = "Пользователь с таким логином уже есть в БД.";
                    messageBox.appendChild(h3);
                }
            }).sendPost();
        }
    }
}
