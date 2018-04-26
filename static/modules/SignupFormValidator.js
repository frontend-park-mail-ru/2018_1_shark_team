"use strict";

import AjaxWorker from "./network/AjaxWorker";
import isStringNormal from "./utils/isStringNormal";
import AlertManager from "./render/AlertManager";

/**
 * объект с константами для вывода сообщений на экран
 * @type {{MESSAGE_LOGIN_EMPTY: string, MESSAGE_LOGIN_BAD_CHARS: string, MESSAGE_PASSWORD_EMPTY: string, MESSAGE_PASSWORD_BAD_CHARS: string}}
 */
const message_signup_page = {
    MESSAGE_LOGIN_EMPTY: "Поле ввода логина пусто.",
    MESSAGE_LOGIN_BAD_CHARS: "Поле ввода логина содержит запретные символы.",
    MESSAGE_PASSWORD_EMPTY: "Поле ввода пароля пусто.",
    MESSAGE_PASSWORD_BAD_CHARS: "Поле ввода пароля содержит запретные символы."
};

/**
 * класс для проверки валидности данных при регистрации
 */
export default class SignupFormValidator {
    /**
     * конструктор для инициализации переключателя страниц и словаря с DOM объектами
     * @param router - переключаетель страниц
     * @param elementsBase - словарь
     */
    constructor(router, elementsBase) {
        this.router = router;
        this.elementsBase = elementsBase;
    }

    /**
     * метод для проверки валидности данных при регистрации и дальнейшей регистрации
     */
    validateSignupForm() {
        const elementsBase = this.elementsBase;

        const login = elementsBase.getElement("signUpLoginField").value;
        const password = elementsBase.getElement("signUpPasswordField").value;

        const messageBox = elementsBase.getElement("signUpMessageBox");
        messageBox.innerHTML = "";

        const messageArr = [];

        if(login.length === 0) {
            messageArr.push(message_signup_page.MESSAGE_LOGIN_EMPTY);
        }

        if(isStringNormal(login) === false) {
            messageArr.push(message_signup_page.MESSAGE_LOGIN_BAD_CHARS);
        }

        if(password.length === 0) {
            messageArr.push(message_signup_page.MESSAGE_PASSWORD_EMPTY);
        }

        if(isStringNormal(password) === false) {
            messageArr.push(message_signup_page.MESSAGE_PASSWORD_BAD_CHARS);
        }

        messageArr.forEach((message) => {
            const p = document.createElement("p");
            p.innerHTML = message;
            messageBox.appendChild(p);
        });

        const router = this.router;

        if(messageArr.length !== 0) {
            const html = messageBox.innerHTML;
            new AlertManager().showAlertWindow(html, () => {
                // close window
            });
        } else {
            const promise = new AjaxWorker("signup/", {
                loginField: login,
                passwordField: password
            }).sendPost();

            promise.then((result) => {
                const message = JSON.parse(result).message;
                if(message === "YES") {
                    const p = document.createElement("p");
                    p.innerHTML = "Регистрация прошла успешно.";
                    messageBox.appendChild(p);
                    const html = messageBox.innerHTML;
                    new AlertManager().showAlertWindow(html, () => {
                        const promise = new AjaxWorker("login/", {
                            loginField: login,
                            passwordField: password
                        }).sendPost();

                        promise.then((result) => {
                            const message = JSON.parse(result).message;
                            if (message === "YES") {
                                router.moveToPage("/main-menu");
                            }
                        });
                    });
                }
                if(message === "NO") {
                    const p = document.createElement("p");
                    p.innerHTML = "Пользователь с таким логином уже есть в БД.";
                    messageBox.appendChild(p);
                    const html = messageBox.innerHTML;
                    new AlertManager().showAlertWindow(html, () => {
                        // close window
                    });
                }
            });
        }
    }
}
