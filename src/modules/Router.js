"use strict";

import AjaxWorker from "./network/AjaxWorker";
import ReloadSpaPageManager from "./ReloadSpaPageManager";
import LogMessage from "../gameFiles/scripts/MessageLogger";
import {depushViews} from "../util/view-util";

/**
 * класс для реализации переключения страниц и роутинга
 */
export default class Router {
    /**
     * конструктор для инициализации словаря с DOM - объектами, массива страниц и добавления события popState
     */
    constructor() {

        this.listOfPages = [];

        window.addEventListener("popstate", () => {
            this.showPage();
        });
    }

    /**
     * мето для добавления страницы в массив страниц
     * @param url - часть адресной строки, соответствующая странице
     * @param viewMakerFn - функция, которая создает экземпляр вью
     */
    addPage(url, viewMakerFn) {
        this.listOfPages.push({
            url: url,
            viewMakerFn: viewMakerFn
        });
    }

    /**
     * метод для скрытия всех страниц и очистки полей ввода и вывода
     */
    hidePages() {
        depushViews();
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
                this.moveToPage("/main-menu");
                return;
            }
        }

        if (!currentPage) {
            const view = this.listOfPages[0].viewMakerFn();
            view.render();
            view.addEventsToElements(this);
            history.pushState({}, "", this.listOfPages[0].url);
            return;
        }

        const view = currentPage.viewMakerFn();
        view.render();
        view.addEventsToElements(this);
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
                new ReloadSpaPageManager(login).reloadSpa();
                this.printPage();
                return;
            }

            if (result === "NO") {
                LogMessage("Authorize NO");
                window.location = "/log-in";
            }
        }).catch((e) => {
            LogMessage("Authorize FAIL: " + e);
            LogMessage(e.stack);
            if (location.pathname !== "/one-player-page") {
                this.moveToPage("/one-player-page");
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
