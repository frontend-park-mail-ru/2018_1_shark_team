"use strict";

import template from "./multiplayer-page.pug";

export default class MultiplayerPage {
    constructor() {
        MultiplayerPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }
}
