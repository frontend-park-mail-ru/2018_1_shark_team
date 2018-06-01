"use strict";

import "../index.scss";

import LogInPage from "../views/log-in-page/LogInPage";
import SignUpPage from "../views/sign-up-page/SignUpPage";
import MainMenuPage from "../views/main-menu-page/MainMenuPage";
import AboutAuthorsPage from "../views/about-authors-page/AboutAuthorsPage";
import GameRulesPage from "../views/game-rules-page/GameRulesPage";
import MyPage from "../views/my-page/MyPage";
import LidersPage from "../views/liders-page/LidersPage";
import OnePlayerPage from "../views/one-player-page/OnePlayerPage";
import MultiplayerPage from "../views/multiplayer-page/MultiplayerPage";

import Router from "./Router";
import initRouter from "./store/initRouter";
import LogMessage from "../gameFiles/scripts/MessageLogger";
import preventDefaultClick from "./preventDefaultClick";

/**
 * класс для запуска сервера, инициализации основных объектов, налаживания взаимодействия между объектами
 */
class Start {
    /**
     * конструктор для вызова методов данного класса
     */
    constructor() {
        this.createPages();
        this.createAndInitRouter();

        // prevent default
        preventDefaultClick(this.router);
    }

    /**
     * метод для создания страниц приложения
     */
    createPages() {
        this.logInPage = new LogInPage();
        this.signInPage = new SignUpPage();
        this.mainMenuPage = new MainMenuPage();
        this.aboutAuthorsPage = new AboutAuthorsPage();
        this.gameRulesPage = new GameRulesPage();
        this.myPage = new MyPage();
        this.lidersPage = new LidersPage();
        this.onePlayerPage = new OnePlayerPage();
        this.multiplayerPage = new MultiplayerPage();
    }

    /**
     * метод для инициализации роутера и добавления в него страниц
     */
    createAndInitRouter() {
        this.router = new Router();
        initRouter(this.router);
        this.router.setAllowedForNotLoggedUsersPages([
            "/log-in",
            "/sign-up",
        ]);
        this.router.showPage();
    }
}


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(function (registration) {
            LogMessage("ServiceWorker registration", registration);
        })
        .catch(function (err) {
            LogMessage("Registration err", err);
        });
}

new Start();

