"use strict";

import AjaxWorker from "./network/AjaxWorker";
import ReloadSpaPageManager from "./ReloadSpaPageManager";
import MessagePrinter from "./render/MessagePrinter";
import LogMessage from "../gameFiles/scripts/MessageLogger";

/**
 * класс для реализации переключения страниц и роутинга
 */
export default class Router {
    /**
     * конструктор для инициализации словаря с DOM - объектами, массива страниц и добавления события popState
     * @param elementsBase
     */
    constructor(elementsBase) {
        this.elementsBase = elementsBase;

        this.listOfPages = [];

        window.addEventListener("popstate", () => {
            this.showPage();
        });
    }

    /**
     * метод для инициализации объекта, отвечающего за очистку полей ввода и боксов
     * @param fieldsCleaner
     */
    initFieldsCleaner(fieldsCleaner) {
        this.fieldsCleaner = fieldsCleaner;
    }

    /**
     * мето для добавления страницы в массив страниц
     * @param url - часть адресной строки, соответствующая странице
     * @param page - DOM объект страница
     */
    addPage(url, page) {
        this.listOfPages.push({
            url: url,
            page: page
        });
    }

    /**
     * метод для скрытия всех страниц и очистки полей ввода и вывода
     */
    hidePages() {
        if (this.fieldsCleaner) {
            this.fieldsCleaner.clearFields();
        }

        this.listOfPages.forEach((element) => {
            element.page.hidden = true;
        });
    }

    /**
     * метод для отрисовки определённой страницы
     */
    printPage() {
        const url = window.location.pathname;

        const currentPage = this.listOfPages.find((element) => url === element.url);

        const way = window.location.pathname;
        LogMessage("Way: " + way);
        if (localStorage.getItem("loginValue")) {
            if (way === "/log-in" || way === "/sign-up") {
                LogMessage("Reload page old Vers");
                ////////////////////
                /*
                this.moveToPage("/main-menu");
                return null;
                */
                ///////////////////
            }
        }

        try {
            currentPage.page.hidden = false;
            return;
        } catch (err) {
            MessagePrinter.write("err");
        }

        this.listOfPages[0].page.hidden = false;
        history.pushState({}, "", this.listOfPages[0].url);
    }

    /**
     * метод для задания страниц, на которых может находиться неавторизованный пользователь
     * @param arrPagesForNotLoggedUsers - массив страниц, на которых может находиться навторизованный пользователь
     */
    setAllowedForNotLoggedUsersPages(arrPagesForNotLoggedUsers) {
        this.arrPagesForNotLoggedUsers = arrPagesForNotLoggedUsers;
    }

    /**
     * метод для контроля возможности перехода на страницу и перехода на страницу в случае прохождения контроля
     */
    showPage() {
        this.hidePages();

        if (this.arrPagesForNotLoggedUsers.indexOf(window.location.pathname) !== -1) {
            this.printPage();
            return;
        }

        const promise = new AjaxWorker("loginbycookies", {}).sendPost();
        promise.then((resultString) => {
            const answerObj = JSON.parse(resultString);
            const result = answerObj.message;
            const login = answerObj.login;

            if (result === "YES") {
                LogMessage("Authorize YES");
                new ReloadSpaPageManager(login, this.elementsBase).reloadSpa();
                this.printPage();
                return;
            }

            if (result === "NO") {
                LogMessage("Authorize NO");
                window.location = "/log-in";
            }
        }).catch(() => {
            if (location.pathname !== "/one-player-page") {
                if (false) this.moveToPage("/one-player-page");  // FIXME remove if false
            }
            this.printPage();
        });
    }

    /**
     * метод для изменения содержимого адресной строки и последующего перехода
     * @param url
     */
    moveToPage(url) {
        history.pushState({}, "", url);
        this.showPage();
    }
}
