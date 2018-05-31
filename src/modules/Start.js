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
import ChatPage from "../views/chat-page/ChatPage";
import MultiplayerPage from "../views/multiplayer-page/MultiplayerPage";

import Router from "./Router";
import FieldsCleaner from "./render/FieldsCleaner";
import initElementsDictionary from "./store/initElementsDictionary";
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
        this.createAndInitElementsBase();
        this.createAndInitRouter();
        this.addEventsToElements();
        this.createAndInitFieldsCleaner();

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
        this.chatPage = new ChatPage();
        this.multiplayerPage = new MultiplayerPage();
    }

    /**
     * метод для инициализации словаря с DOM объектами
     */
    createAndInitElementsBase() {
        this.elementsBase = initElementsDictionary();
    }

    /**
     * метод для инициализации роутера и добавления в него страниц
     */
    createAndInitRouter() {
        this.router = new Router(this.elementsBase);
        initRouter(this.router);
        this.router.setAllowedForNotLoggedUsersPages([
            "/log-in",
            "/sign-up",
        ]);
        this.router.showPage();
    }

    /**
     * метод для добавления событий к элементам в каждой вьюхе
     */
    addEventsToElements() {
        LogInPage.addEventsToElements(this.router, this.elementsBase);
        SignUpPage.addEventsToElements(this.router, this.elementsBase);
        MainMenuPage.addEventsToElements(this.router, this.elementsBase);
        AboutAuthorsPage.addEventsToElements(this.router, this.elementsBase);
        GameRulesPage.addEventsToElements(this.router, this.elementsBase);
        MyPage.addEventsToElements(this.router, this.elementsBase);
        LidersPage.addEventsToElements(this.router, this.elementsBase);
        OnePlayerPage.addEventsToElements(this.router);
        ChatPage.addEventsToElements(this.router, this.elementsBase);
        MultiplayerPage.addEventsToElements();
    }

    /**
     * метод для инициализации объекта для чистки полей ввода и вывода, заполнение его значениями
     */
    createAndInitFieldsCleaner() {
        this.fieldsCleaner = new FieldsCleaner();
        const dict = this.elementsBase;

        const arr = [
            "signUpLoginField",
            "signUpPasswordField",
            "signUpMessageBox",
            "logInLoginField",
            "logInPasswordField",
            "logInMessageBox",
            "myPageMessageBox",
            "chatInputField",
            "chatMessageBox",
        ];

        arr.forEach((element) => {
            this.fieldsCleaner.addField(dict.getElement(element));
        });

        this.fieldsCleaner.clearFields();
        this.router.initFieldsCleaner(this.fieldsCleaner);
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

