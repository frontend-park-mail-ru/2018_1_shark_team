"use strict";

import template from "./my-page.pug";

export default class MyPage {
    constructor() {
        MyPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".my-page__main-menu-btn").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });
    }
}
