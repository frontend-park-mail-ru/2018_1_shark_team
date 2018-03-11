"use strict";

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

import Router from "./Router";
import ElementsBase from "./ElementsBase";
import FieldsCleaner from "./FieldsCleaner";
import MessagePrinter from "./MessagePrinter";

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
    }

    /**
     * метод для инициализации словаря с DOM объектами
     */
    createAndInitElementsBase() {
        this.elementsBase = new ElementsBase();

        this.elementsBase.addElement("signUpLoginField", document.querySelector(".sign-up-page__form .form__login-input-field"));
        this.elementsBase.addElement("signUpPasswordField", document.querySelector(".sign-up-page__form .form__password-input-field"));
        this.elementsBase.addElement("signUpMessageBox", document.querySelector(".sign-up-page__message-box"));

        this.elementsBase.addElement("logInLoginField", document.querySelector(".log-in-page__form .form__login-input-field"));
        this.elementsBase.addElement("logInPasswordField", document.querySelector(".log-in-page__form .form__password-input-field"));
        this.elementsBase.addElement("logInMessageBox", document.querySelector(".log-in-page__message-box"));

        this.elementsBase.addElement("mainMenuLoginLabel", document.querySelector(".main-menu-page__label"));

        this.elementsBase.addElement("myPageLoginLabel", document.querySelector(".my-page__user-login-label"));
        this.elementsBase.addElement("fileInputHiddenBtn", document.querySelector(".form__file-button"));
        this.elementsBase.addElement("userAvatarImage", document.querySelector(".form__user-avatar-image"));
        this.elementsBase.addElement("myPageMessageBox", document.querySelector(".my-page__message-box"));

        this.elementsBase.addElement("lidersPageLoginLabel", document.querySelector(".liders-page__login-label"));
        this.elementsBase.addElement("lidersBox", document.querySelector(".liders-page__liders-list-box"));
    }

    /**
     * метод для инициализации роутера и добавления в него страниц
     */
    createAndInitRouter() {
        this.router = new Router(this.elementsBase);
        this.router.addPage("/main-menu", document.querySelector(".main-menu-page"));
        this.router.addPage("/log-in", document.querySelector(".log-in-page"));
        this.router.addPage("/sign-up", document.querySelector(".sign-up-page"));
        this.router.addPage("/about-authors", document.querySelector(".about-authors-page"));
        this.router.addPage("/game-rules", document.querySelector(".game-rules-page"));
        this.router.addPage("/my-page", document.querySelector(".my-page"));
        this.router.addPage("/liders-page", document.querySelector(".liders-page"));
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
    }

    /**
     * метод для инициализации объекта для чистки полей ввода и вывода, заполнение его значениями
     */
    createAndInitFieldsCleaner() {
        this.fieldsCleaner = new FieldsCleaner();
        const dict = this.elementsBase;

        this.fieldsCleaner.addField(dict.getElement("signUpLoginField"));
        this.fieldsCleaner.addField(dict.getElement("signUpPasswordField"));
        this.fieldsCleaner.addField(dict.getElement("signUpMessageBox"));
        this.fieldsCleaner.addField(dict.getElement("logInLoginField"));
        this.fieldsCleaner.addField(dict.getElement("logInPasswordField"));
        this.fieldsCleaner.addField(dict.getElement("logInMessageBox"));
        this.fieldsCleaner.addField(dict.getElement("myPageMessageBox"));

        this.fieldsCleaner.clearFields();
        this.router.initFieldsCleaner(this.fieldsCleaner);
    }
}

/**
 * при загрузке окна запускаем приложуху
 */
window.addEventListener("load", () => {
    MessagePrinter.write("window load complete");
    new Start();
});
