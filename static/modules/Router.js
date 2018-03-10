"use strict";

import AjaxWorker from "./AjaxWorker";

export default class Router {
    constructor() {
        this.listOfPages = [];

        window.addEventListener("popstate", () => {
            this.showPage();
        });
    }

    initFieldsCleaner(fieldsCleaner) {
        this.fieldsCleaner = fieldsCleaner;
    }

    addPage(url, page) {
        this.listOfPages.push({
            url: url,
            page: page
        });
    }

    hidePages() {
        if(this.fieldsCleaner !== undefined && this.fieldsCleaner !== null) {
            this.fieldsCleaner.clearFields();
        }

        this.listOfPages.forEach((element) => {
            element.page.hidden = true;
        });
    }

    printPage() {
        const url = window.location.pathname;
        let flag = true;
        this.listOfPages.forEach((element) => {
            if(url === element.url && flag === true) {
                element.page.hidden = false;
                flag = false;
            }
        });
        if(flag === false) {
            return;
        }
        this.listOfPages[0].page.hidden = false;
        history.pushState({}, "", this.listOfPages[0].url);
    }

    setAllowedForNotLoggedUsersPages(arrPagesForNotLoggedUsers) {
        this.arrPagesForNotLoggedUsers = arrPagesForNotLoggedUsers;
    }

    showPage() {
        this.hidePages();

        if(this.arrPagesForNotLoggedUsers.indexOf(window.location.pathname) !== -1) {
            this.printPage();
            return;
        }

        new AjaxWorker("loginbycookies", {}, (resultString) => {
           const result = JSON.parse(resultString).message;

           if(result === "YES") {
               this.printPage();
               return;
           }
           if(result === "NO") {
                window.location = "/log-in";
           }
        }).sendPost();
    }

    moveToPage(url) {
        history.pushState({}, "", url);
        this.showPage();
    }
}
