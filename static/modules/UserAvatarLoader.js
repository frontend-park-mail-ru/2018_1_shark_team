"use strict";

import AjaxWorker from "./AjaxWorker";

export default class UserAvatarLoader {
    constructor(elementsBase, login) {
        this.elementsBase = elementsBase;
        this.login = login;
    }

    loadAvatar() {
        const elementsBase = this.elementsBase;
        const login = this.login;

        new AjaxWorker("getavatar", {
            login: login
        }, (image) => {
            if(image === "IMAGE_NOT_SET") {
                elementsBase.getElement("userAvatarImage").src = "./images/userImage.jpg";
            } else {
                elementsBase.getElement("userAvatarImage").src = image;
            }
        }).sendPost();
    }
}
