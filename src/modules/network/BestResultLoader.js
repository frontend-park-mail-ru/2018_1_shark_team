"use strict";

import AjaxWorker from "./AjaxWorker";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class BestResultLoader {
    constructor() {
        this.login = localStorage.getItem("loginValue").toString();
        this.sendQueryToServer();
    }

    sendQueryToServer() {
        const login = this.login;
        new AjaxWorker("bestresult", {
            loginData: login,
        }).sendPost()
            .then((ans) => {
                LogMessage(ans);
                const obj = JSON.parse(ans.toString());
                this.workWithAns(obj);
            });
    }

    workWithAns(obj) {
        this.label = document.querySelector(".liders-page__user-result-label");
        if(obj.score === -1 || obj.place === -1) {
            this.label.innerHTML = "Лучший результат: " + "отсутствует";
        } else {
            this.label.innerHTML = "Лучший результат: " + obj.score.toString() + " (" + obj.place.toString() + " место) ";
        }
    }
}
