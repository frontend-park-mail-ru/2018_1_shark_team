"use strict";

export default class MessagesLogRender {
    constructor(messageBox) {
        this.messageBox = messageBox;
    }

    clearBox() {
        this.messageBox.innerHTML = "";
    }

    pushArrToBox(messageArr) {
        const messageBox = this.messageBox;
        messageArr.forEach((message) => {
            const p = document.createElement("div");
            p.innerHTML = message;
            messageBox.appendChild(p);
        });
    }

    printBadLoginAndPassword() {
        const messageBox = this.messageBox;
        const p = document.createElement("div");
        p.innerHTML = "Неверный логин или пароль.";
        messageBox.appendChild(p);
    }
}
