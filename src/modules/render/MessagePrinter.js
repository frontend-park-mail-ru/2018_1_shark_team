/* eslint-disable no-console */
"use strict";

/**
 * класс для вывода сообщений на экран
 */
export default class MessagePrinter {
    /**
     * мето для вывода одного сообщения
     * @param message - содержимое сообщения
     */
    static write(message) {
        console.log(message);
    }
}
