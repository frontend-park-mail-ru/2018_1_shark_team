"use strict";

export default class AlertManager {
    constructor() {
        this.backgroundBox = document.querySelector(".full-screen-box");
        this.messageContentBox = document.querySelector(".alert-window");
        this.btn = document.querySelector(".content__ok-button");
        this.textContentBox = document.querySelector(".content__message-content");
    }

    showAlertWindow(textContent, callback) {
        this.textContentBox.innerHTML = textContent.toString();
        this.backgroundBox.hidden = false;
        this.messageContentBox.hidden = false;
        this.btn.onclick = () => {
            this.backgroundBox.hidden = true;
            this.messageContentBox.hidden = true;
            callback();
        };
    }
}
