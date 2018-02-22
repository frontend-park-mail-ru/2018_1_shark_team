"use strict";

import template from "./log-in-page.pug";
import StringContentManager from "../../modules/StringContentManager";
import AjaxWorker from "../../modules/AjaxWorker";

export default class LogInPage {
    constructor() {
        LogInPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".log-in-page__link-to-sign-up-page").addEventListener("click", () => {
            router.moveToPage("/sign-up");
        });

        document.querySelector(".form__log-in-button").addEventListener("click", () => {
            const login = elementsBase.getElement("logInLoginField").value;
            const password = elementsBase.getElement("logInPasswordField").value;

            const messageBox = elementsBase.getElement("logInMessageBox");
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
                AjaxWorker.sendPost("login/", {
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
                });
            }
        });
    }
}
