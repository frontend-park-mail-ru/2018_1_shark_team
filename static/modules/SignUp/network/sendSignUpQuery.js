"use strict";

import AlertManager from "../../render/AlertManager";
import AjaxWorker from "../../network/AjaxWorker";

export default function sendSignUpQuery (login, password, messageBox, router, render) {
    const promise = new AjaxWorker("/api/users/signup/", {
        loginField: login,
        passwordField: password,
        emailField: login + "@yandex.ru",
    }).sendPost();

    promise.then((result) => {
        render.renderRegistrationOK();
        const html = messageBox.innerHTML;
        new AlertManager().showAlertWindow(html, () => {
            router.moveToPage("/main-menu");
        });
    });

    promise.catch((result) => {
        render.renderBadUser();
        const html = messageBox.innerHTML;
        new AlertManager().showAlertWindow(html, () => {
            // close window
        });
    });
}
