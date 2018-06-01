"use strict";

import UserAvatarLoader from "./network/UserAvatarLoader";
import getLiaderBoard from "./LiderBoard/LiderBoardLoader";
import LogMessage from "../gameFiles/scripts/MessageLogger";
import BestResultLoader from "./network/BestResultLoader";

/**
 * класс для выполнения реинициализаций при открытии страниц приложения
 */
export default class ReloadSpaPageManager {
    /**
     * конструктор для инициализации логина пользователя и словаря с DOM объектами
     * @param login - логин пользователя
     */
    constructor(login) {
        this.login = login;
    }

    /**
     * метод для реинициализации записей, аватарки, списка лидеров
     */
    reloadSpa() {
        // print login of user to all pages
        ///////////////////////////////////
        const login = this.login;
        localStorage.setItem("loginValue", login);
        ///////////////////////////////////

        const way = window.location.pathname;
        LogMessage("Way way way way: " + way);

        if (way === "/my-page") {
            const userAvatarLoader = new UserAvatarLoader(login);
            userAvatarLoader.loadAvatar();
        }

        LogMessage("Reload SPA");

        if (way === "/liders-page") {
            const liaderBoard = getLiaderBoard();
            liaderBoard.initLiderBoard();
            liaderBoard.initLiderBoardParams();
            liaderBoard.loadLiders();
            // print best result of current user
            new BestResultLoader();
        }
    }
}
