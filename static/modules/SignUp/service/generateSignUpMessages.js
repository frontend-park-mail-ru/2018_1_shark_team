"use strict";

import isStringNormal from "../../utils/isStringNormal";

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

export default function generateSignUpMessages (login, password, messageArr) {
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
}
