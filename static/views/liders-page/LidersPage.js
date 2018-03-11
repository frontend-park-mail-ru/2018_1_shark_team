"use strict";

import template from "./liders-page.pug";
import LiderBoardLoader from "../../modules/LiderBoardLoader";

export default class LidersPage {
    constructor() {
        LidersPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".liders-page__main-menu-button").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });

        document.querySelector(".liders-page__previous-list-button").addEventListener("click", () => {
            LiderBoardLoader.moveLeft();
            new LiderBoardLoader(elementsBase).loadLiders();
        });

        document.querySelector(".liders-page__next-list-button").addEventListener("click", () => {
            LiderBoardLoader.moveRight();
            new LiderBoardLoader(elementsBase).loadLiders();
        });
    }
}
