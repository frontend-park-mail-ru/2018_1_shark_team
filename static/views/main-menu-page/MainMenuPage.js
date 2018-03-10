"use strict";

import template from "./main-menu-page.pug";
import ExitManager from "../../modules/ExitManager";

export default class MainMenuPage {
    constructor() {
        MainMenuPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".form__exit-button").addEventListener("click", () => {
            new ExitManager(["BE79DSEA", "F1IIMEH4SEA", "loginOfUser"]).exitFromSystem();
        });

        document.querySelector(".form__about-authors-button").addEventListener("click", () => {
            router.moveToPage("/about-authors");
        });

        document.querySelector(".form__game-rules-button").addEventListener("click", () => {
            router.moveToPage("/game-rules");
        });

        document.querySelector(".form__my-page-button").addEventListener("click", () => {
            router.moveToPage("/my-page");
        });
    }
}
