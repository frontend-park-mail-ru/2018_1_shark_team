"use strict";

import AjaxWorker from "./AjaxWorker";

export default class ExitManager {
    constructor(cookieNamesArr) {
        this.cookieNamesArr = cookieNamesArr;
    }

    dropAllCookies() {
        this.cookieNamesArr.forEach((cookName) => {
            try {
                Cookies.set(cookName, "", {
                    expires: -1
                });
            } catch (err) {}
        });
    }

    static reloadWindow() {
        window.location = "/log-in"
    }

    exitFromSystem() {
        this.dropAllCookies();
        localStorage.clear();

        new AjaxWorker("logout", {}, (result) => {
            console.log("Log out complete");
            ExitManager.reloadWindow();
        }).sendPost();
    }
}
