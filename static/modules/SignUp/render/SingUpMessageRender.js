"use strict";

export default class SingUpMessageRender {
    constructor(messageBox) {
        this.messageBox = messageBox;
    }

    clearBox() {
        this.messageBox.innerHTML = "";
    }

    renderArrayElements(messageArr) {
        const messageBox = this.messageBox;
        messageArr.forEach((message) => {
            const p = document.createElement("p");
            p.innerHTML = message;
            messageBox.appendChild(p);
        });
    }

    renderRegistrationOK() {
        const p = document.createElement("p");
        p.innerHTML = "Регистрация прошла успешно.";
        this.messageBox.appendChild(p);
        const html = this.messageBox.innerHTML;
    }

    renderBadUser() {
        const p = document.createElement("p");
        p.innerHTML = "Пользователь с таким логином уже есть в БД.";
        this.messageBox.appendChild(p);
        const html = this.messageBox.innerHTML;
    }
}
