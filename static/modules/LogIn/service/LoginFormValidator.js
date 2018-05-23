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

        // объект для отображения сообщений
        const render = new MessagesLogRender(messageBox);
        // очищаем бокс
        render.clearBox();

        const messageArr = [];

        // формирование массива с сообщениями
        generateLogMessages(login, password, messageArr);

        // отображаем массив
        render.pushArrToBox(messageArr);

        if(messageArr.length !== 0) {
            const html = messageBox.innerHTML;
            new AlertManager().showAlertWindow(html, () => {
                // close window
            });
        } else {
            sendAuthQuery (login, password, router, messageBox, render);
        }
    }
}
