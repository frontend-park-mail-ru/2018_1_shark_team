"use strict";

import template from "./chat-page.pug";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

export default class ChatPage {
    constructor() {
        ChatPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".chat-page__main-menu-button").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });

        document.querySelector(".chat-page__send-message-button").addEventListener("click", () => {
            const inputField = elementsBase.getElement("chatInputField");
            LogMessage(inputField.value);
        });
    }
}
