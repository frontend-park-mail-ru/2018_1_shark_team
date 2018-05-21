"use strict";

import template from "./multiplayer-page.pug";

export default class MultiplayerPage {
    constructor() {
        MultiplayerPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements() {
        document.querySelector(".multiplayer-page__main-menu-button").onclick = () => {
            window.location = "/main-menu";
        };
    }
}
