"use strict";

import template from "./about-authors-page.pug";

export default class AboutAuthorsPage {
    constructor() {
        AboutAuthorsPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        document.querySelector(".about-authors-page__main-menu-button").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });
    }
}
