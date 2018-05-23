"use strict";

import AjaxWorker from "./AjaxWorker";

/**
 * класс для загрузки аватарки пользователя
 */
export default class UserAvatarLoader {
    /**
     * конструктор для инициализации словаря с DOM объектами и логина пользователя
     * @param elementsBase - словарь
     * @param login - логин пользователя
     */
    constructor(elementsBase, login) {
        this.elementsBase = elementsBase;
        this.login = login;
    }

    /**
     * метод для загрузки аватарки
     */
    loadAvatar() {
        const elementsBase = this.elementsBase;
        const login = this.login;

        const promise = new AjaxWorker("getavatar", {
            login: login
        }).sendPost();

        promise.then((image) => {
            if (image === "IMAGE_NOT_SET") {
                elementsBase.getElement("userAvatarImage").src = "./images/userImage.jpg";
            } else {
                elementsBase.getElement("userAvatarImage").src = image;
            }
        });
    }
}
