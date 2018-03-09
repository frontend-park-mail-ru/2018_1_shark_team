"use strict";

import StringContentManager from "./StringContentManager";
import AjaxWorker from "./AjaxWorker";

const message_login_page = {
    MESSAGE_LOGIN_EMPTY: "Поле ввода логина пусто.",
    MESSAGE_LOGIN_BAD_CHARS: "Поле ввода логина содержит запретные символы.",
    MESSAGE_PASSWORD_EMPTY: "Поле ввода пароля пусто.",
    MESSAGE_PASSWORD_BAD_CHARS: "Поле ввода пароля содержит запретные символы."
};

export default class LoginFormValidator {
    constructor(router, elementsBase) {
        this.router = router;
        this.elementsBase = elementsBase;
    }

    validateLoginForm() {
        const router = this.router;
        const elementsBase = this.elementsBase;

        const login = elementsBase.getElement("logInLoginField").value;
        const password = elementsBase.getElement("logInPasswordField").value;

        const messageBox = elementsBase.getElement("logInMessageBox");
        messageBox.innerHTML = "";

        const messageArr = [];

        if(login.length === 0) {
            messageArr.push(message_login_page.MESSAGE_LOGIN_EMPTY);
        }

        if(new StringContentManager(login).normalString() === false) {
            messageArr.push(message_login_page.MESSAGE_LOGIN_BAD_CHARS);
        }

        if(password.length === 0) {
            messageArr.push(message_login_page.MESSAGE_PASSWORD_EMPTY);
        }

        if(new StringContentManager(password).normalString() === false) {
            messageArr.push(message_login_page.MESSAGE_PASSWORD_BAD_CHARS);
        }

        for(let i = 0; i < messageArr.length; i++) {
            const message = messageArr[i];
            const p = document.createElement('p');
            p.innerHTML = message;
            messageBox.appendChild(p);
        }

        if(messageArr.length === 0) {
            new AjaxWorker("login/", {
                loginField: login,
                passwordField: password
            }, (result) => {
                const message = JSON.parse(result).message;
                if(message === "YES") {
                    router.moveToPage("/main-menu");
                }
                if(message === "NO") {
                    const h3 = document.createElement('h3');
                    h3.innerHTML = "Неверный логин или пароль.";
                    messageBox.appendChild(h3);
                }
            }).sendPost();
        }
    }
}
