"use strict";

import template from "./main-menu-page.pug";

export default class MainMenuPage {
    constructor() {
        MainMenuPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }
}
