"use strict";

import AlertManager from "../../render/AlertManager";
import AjaxWorker from "../../network/AjaxWorker";

export default function sendSignUpQuery (login, password, messageBox, router, render) {
    const promise = new AjaxWorker("signup/", {
        loginField: login,
        passwordField: password
    }).sendPost();

    promise.then((result) => {
        const message = JSON.parse(result).message;
        if(message === "YES") {
            render.renderRegistrationOK();

            const html = messageBox.innerHTML;
            new AlertManager().showAlertWindow(html, () => {
                const promise = new AjaxWorker("login/", {
                    loginField: login,
                    passwordField: password
                }).sendPost();

                promise.then((result) => {
                    const message = JSON.parse(result).message;
                    if (message === "YES") {
                        router.moveToPage("/main-menu");
                    }
                });
            });
        }

        if(message === "NO") {
            render.renderBadUser();

            const html = messageBox.innerHTML;
            new AlertManager().showAlertWindow(html, () => {
                // close window
            });
        }
    });
}
