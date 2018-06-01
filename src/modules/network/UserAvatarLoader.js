"use strict";

import AjaxWorker from "./AjaxWorker";

/**
 * класс для загрузки аватарки пользователя
 */
export default class UserAvatarLoader {
    /**
     * конструктор для инициализации словаря с DOM объектами и логина пользователя
     * @param login - логин пользователя
     */
    constructor(login) {
        this.login = login;
    }

    /**
     * метод для загрузки аватарки
     */
    loadAvatar() {
        const login = this.login;

        const promise = new AjaxWorker("getavatar", {
            login: login
        }).sendPost();

        promise.then((image) => {
            if (image === "IMAGE_NOT_SET") {
                document.querySelector(".form__user-avatar-image").src = "./images/userImage.jpg";
            } else {
                document.querySelector(".form__user-avatar-image").src = image;
            }
        });
    }
}
