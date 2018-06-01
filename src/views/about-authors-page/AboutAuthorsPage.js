"use strict";

import template from "./about-authors-page.pug";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import {pushDoubleMenuView} from "../../util/view-util";

export default class AboutAuthorsPage {
    constructor() {
    }

    render() {
        pushDoubleMenuView(template());
    }

    addEventsToElements(router) {
        LogMessage("Router: " + router);
    }
}
