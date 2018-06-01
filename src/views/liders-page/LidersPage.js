"use strict";

import template from "./liders-page.pug";
import getLiaderBoard from "../../modules/LiderBoard/LiderBoardLoader";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import {pushSingleMenuView} from "../../util/view-util";

export default class LidersPage {
    constructor() {
    }

    render() {
        pushSingleMenuView(template());
        this._drawLogin();
    }

    addEventsToElements(router) {
        LogMessage("Router: " + router);

        document.querySelector(".liders-page__previous-list-button").addEventListener("click", () => {
            const liaderBoard = getLiaderBoard();
            liaderBoard.moveLeft();
            liaderBoard.loadLiders();
        });

        document.querySelector(".liders-page__next-list-button").addEventListener("click", () => {
            const liaderBoard = getLiaderBoard();
            liaderBoard.moveRight();
            liaderBoard.loadLiders();
        });
    }

    _drawLogin() {
        const loginValueStr = "Логин: " + localStorage.getItem("loginValue");
        document.querySelector(".liders-page__login-label").innerHTML = loginValueStr;
    }
}
