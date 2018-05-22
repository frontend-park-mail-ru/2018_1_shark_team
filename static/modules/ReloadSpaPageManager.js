"use strict";

import UserAvatarLoader from "./network/UserAvatarLoader";
import getLiaderBoard from "./LiderBoard/LiderBoardLoader";
import LogMessage from "../gameFiles/scripts/MessageLogger";
import drawLogins from "./render/drawLogins";
import ZoomManager from "./utils/ZoomManager";

/**
 * класс для выполнения реинициализаций при открытии страниц приложения
 */
export default class ReloadSpaPageManager {
    /**
     * конструктор для инициализации логина пользователя и словаря с DOM объектами
     * @param login - логин пользователя
     * @param elementsBase - словарь с DOM объектами
     */
    constructor(login, elementsBase) {
        this.login = login;
        this.elementsBase = elementsBase;
    }

    /**
     * метод для реинициализации записей, аватарки, списка лидеров
     */
    reloadSpa() {
        const login = this.login;
        localStorage.setItem("loginValue", login);
        drawLogins (login, this.elementsBase);

        const userAvatarLoader = new UserAvatarLoader(this.elementsBase, login);
        userAvatarLoader.loadAvatar();

        LogMessage("Reload SPA");

        const liaderBoard = getLiaderBoard();
        liaderBoard.initLiderBoard(this.elementsBase);
        liaderBoard.initLiderBoardParams();
        liaderBoard.loadLiders();

        // zoom control
        ZoomManager.resizeAction();
    }
}
