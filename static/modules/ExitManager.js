"use strict";

import AjaxWorker from "./AjaxWorker";
import MessagePrinter from "./MessagePrinter";

export default class ExitManager {
    static reloadWindow() {
        window.location = "/log-in";
    }

    exitFromSystem() {
        localStorage.clear();
        new AjaxWorker("logout", {}, (result) => {
            MessagePrinter.write(result);
            MessagePrinter.write("Log out complete");
            ExitManager.reloadWindow();
        }).sendPost();
    }
}
