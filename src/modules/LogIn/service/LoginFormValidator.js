"use strict";

import AlertManager from "../../render/AlertManager";
import generateLogMessages from "./generateLogMessages";
import MessagesLogRender from "../render/MessagesLogRender";
import sendAuthQuery from "../network/sendAuthQuery";

/**
 * класс для проверки валидности данных при авторизации пользователя
 */
export default class LoginFormValidator {
    /**
     * конструктор для инициализации переключателя страниц и словаря с DOM объектами
     * @param router - переключатель страниц
     */
    constructor(router) {
        this.router = router;
    }

    /**
     * метод для проверки валидности данных и авторизации пользователя
     */
    validateLoginForm() {
        const router = this.router;

        const login = document.querySelector(".log-in-page__form .form__login-input-field").value;
        const password = document.querySelector(".log-in-page__form .form__password-input-field").value;

        const messageBox = document.querySelector(".log-in-page__message-box");

        // объект для отображения сообщений
        const render = new MessagesLogRender(messageBox);
        // очищаем бокс
        render.clearBox();

        const messageArr = [];

        // формирование массива с сообщениями
        generateLogMessages(login, password, messageArr);

        // отображаем массив
        render.pushArrToBox(messageArr);

        if (messageArr.length !== 0) {
            const html = messageBox.innerHTML;
            new AlertManager().showAlertWindow(html, () => {
                // close window
            });
        } else {
            sendAuthQuery(login, password, router, messageBox, render);
        }
    }
}
