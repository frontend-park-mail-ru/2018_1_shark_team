"use strict";

import template from "./game-rules-page.pug";

export default class GameRulesPage {
    constructor() {
        GameRulesPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        document.querySelector(".game-rules-page__main-menu-button").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });
    }
}