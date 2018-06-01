"use strict";

import AlertManager from "../../render/AlertManager";
import generateSignUpMessages from "./generateSignUpMessages";
import SingUpMessageRender from "../render/SingUpMessageRender";
import sendSignUpQuery from "../network/sendSignUpQuery";


/**
 * класс для проверки валидности данных при регистрации
 */
export default class SignupFormValidator {
    /**
     * конструктор для инициализации переключателя страниц и словаря с DOM объектами
     * @param router - переключаетель страниц
     */
    constructor(router) {
        this.router = router;
    }

    /**
     * метод для проверки валидности данных при регистрации и дальнейшей регистрации
     */
    validateSignupForm() {
        const login = document.querySelector(".sign-up-page__form .form__login-input-field").value;
        const password = document.querySelector(".sign-up-page__form .form__password-input-field").value;

        const messageBox = document.querySelector(".sign-up-page__message-box");

        // объект для вывода сообщений
        const render = new SingUpMessageRender(messageBox);
        // очищаем содержимое бокса
        render.clearBox();

        const messageArr = [];

        // формируем массив сообщений
        generateSignUpMessages(login, password, messageArr);

        // выводим на экран содержимое массива
        render.renderArrayElements(messageArr);

        const router = this.router;

        if (messageArr.length !== 0) {
            const html = messageBox.innerHTML;
            new AlertManager().showAlertWindow(html, () => {
                // close window
            });
        } else {
            sendSignUpQuery(login, password, messageBox, router, render);
        }
    }
}
