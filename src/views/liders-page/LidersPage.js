"use strict";

import template from "./liders-page.pug";
import getLiaderBoard from "../../modules/LiderBoard/LiderBoardLoader";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class LidersPage {
    constructor() {
        LidersPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
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
}
