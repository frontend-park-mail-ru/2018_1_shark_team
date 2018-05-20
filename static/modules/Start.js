"use strict";

import "../global.scss";

import LogInPage from "../views/log-in-page/LogInPage";
import "../views/log-in-page/log-in-page.scss";

import SignUpPage from "../views/sign-up-page/SignUpPage";
import "../views/sign-up-page/sign-up-page.scss";

import MainMenuPage from "../views/main-menu-page/MainMenuPage";
import "../views/main-menu-page/main-menu-page.scss";

import AboutAuthorsPage from "../views/about-authors-page/AboutAuthorsPage";
import "../views/about-authors-page/about-authors-page.scss";

import GameRulesPage from "../views/game-rules-page/GameRulesPage";
import "../views/game-rules-page/game-rules-page.scss";

import MyPage from "../views/my-page/MyPage";
import "../views/my-page/my-page.scss";

import LidersPage from "../views/liders-page/LidersPage";
import "../views/liders-page/liders-page.scss";

import OnePlayerPage from "../views/one-player-page/OnePlayerPage";
import "../views/one-player-page/one-player-page.scss";

import ChatPage from "../views/chat-page/ChatPage";
import "../views/chat-page/chat-page.scss";

import Router from "./Router";
import FieldsCleaner from "./render/FieldsCleaner";
import initElementsDictionary from "./store/initElementsDictionary";
import initRouter from "./store/initRouter";
import ZoomManager from "./utils/ZoomManager";

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
        // init zoom
        new ZoomManager();
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

/**
 * при загрузке окна запускаем приложуху
 */
window.addEventListener("load", () => {
    // start application
    new Start();
});
