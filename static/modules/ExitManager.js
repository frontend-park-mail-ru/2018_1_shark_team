"use strict";

import AjaxWorker from "./AjaxWorker";
import MessagePrinter from "./MessagePrinter";

/**
 * класс для реализации разлогинивания пользователя
 */
export default class ExitManager {
    /**
     * метод для перезагрузки окна
     */
    static reloadWindow() {
        window.location = "/log-in";
    }

    /**
     * метод для выхода из системы
     */
    exitFromSystem() {
        localStorage.clear();
        const promise = new AjaxWorker("logout", {}).sendPost();
        promise.then((result) => {
            MessagePrinter.write(result);
            MessagePrinter.write("Log out complete");
            ExitManager.reloadWindow();
        });
    }
}
