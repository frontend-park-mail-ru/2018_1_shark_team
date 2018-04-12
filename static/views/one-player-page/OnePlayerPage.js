"use strict";

import template from "./one-player-page.pug";

export default class OnePlayerPage {
    constructor() {
        OnePlayerPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        document.querySelector(".one-player-page__main-menu-button").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });
    }
}
