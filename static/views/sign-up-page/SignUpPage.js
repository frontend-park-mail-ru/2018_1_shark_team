"use strict";

import template from "./sign-up-page.pug";
import StringContentManager from "../../modules/StringContentManager";
import AjaxWorker from "../../modules/AjaxWorker";

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
            const login = elementsBase.getElement("signUpLoginField").value;
            const password = elementsBase.getElement("signUpPasswordField").value;

            const messageBox = elementsBase.getElement("signUpMessageBox");
            messageBox.innerHTML = "";

            const messageArr = [];

            if(login.length === 0) {
                messageArr.push("Поле ввода логина пусто.");
            }

            if(StringContentManager.normalString(login) === false) {
                messageArr.push("Поле ввода логина содержит запретные символы.")
            }

            if(password.length === 0) {
                messageArr.push("Поле ввода пароля пусто.");
            }

            if(StringContentManager.normalString(password) === false) {
                messageArr.push("Поле ввода пароля содержит запретные символы.");
            }

            for(let i = 0; i < messageArr.length; i++) {
                const message = messageArr[i];
                const p = document.createElement('p');
                p.innerHTML = message;
                messageBox.appendChild(p);
            }

            if(messageArr.length === 0) {
                AjaxWorker.sendPost("signup/", {
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
                });
            }
        });
    }
}
