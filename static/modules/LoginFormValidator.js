"use strict";

import AjaxWorker from "./AjaxWorker";
import isStringNormal from "./isStringNormal";

/**
 * объект с константами для вывода сообщений на экран
 * @type {{MESSAGE_LOGIN_EMPTY: string, MESSAGE_LOGIN_BAD_CHARS: string, MESSAGE_PASSWORD_EMPTY: string, MESSAGE_PASSWORD_BAD_CHARS: string}}
 */
const message_login_page = {
    MESSAGE_LOGIN_EMPTY: "Поле ввода логина пусто.",
    MESSAGE_LOGIN_BAD_CHARS: "Поле ввода логина содержит запретные символы.",
    MESSAGE_PASSWORD_EMPTY: "Поле ввода пароля пусто.",
    MESSAGE_PASSWORD_BAD_CHARS: "Поле ввода пароля содержит запретные символы."
};

/**
 * класс для проверки валидности данных при авторизации пользователя
 */
export default class LoginFormValidator {
    /**
     * конструктор для инициализации переключателя страниц и словаря с DOM объектами
     * @param router - переключатель страниц
     * @param elementsBase - словарь с DOM объектами
     */
    constructor(router, elementsBase) {
        this.router = router;
        this.elementsBase = elementsBase;
    }

    /**
     * метод для проверки валидности данных и авторизации пользователя
     */
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

        if(isStringNormal(login) === false) {
            messageArr.push(message_login_page.MESSAGE_LOGIN_BAD_CHARS);
        }

        if(password.length === 0) {
            messageArr.push(message_login_page.MESSAGE_PASSWORD_EMPTY);
        }

        if(isStringNormal(password) === false) {
            messageArr.push(message_login_page.MESSAGE_PASSWORD_BAD_CHARS);
        }

        messageArr.forEach((message) => {
            const p = document.createElement("p");
            p.innerHTML = message;
            messageBox.appendChild(p);
        });

        if(messageArr.length === 0) {
            const promise = new AjaxWorker("login/", {
                loginField: login,
                passwordField: password
            }).sendPost();

            promise.then((result) => {
                const message = JSON.parse(result).message;
                if(message === "YES") {
                    router.moveToPage("/main-menu");
                }
                if(message === "NO") {
                    const h3 = document.createElement("h3");
                    h3.innerHTML = "Неверный логин или пароль.";
                    messageBox.appendChild(h3);
                }
            });
        }
    }
}
