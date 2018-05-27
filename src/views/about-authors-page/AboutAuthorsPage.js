"use strict";

import template from "./about-authors-page.pug";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class AboutAuthorsPage {
    constructor() {
        AboutAuthorsPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router) {
        LogMessage("Router: " + router);
    }
}
