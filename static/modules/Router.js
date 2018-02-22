"use strict";

export default class Router {
    constructor() {
        this.listOfPages = [];

        window.addEventListener("popstate", () => {
            this.showPage();
        });
    }


    addPage(url, page) {
        this.listOfPages.push({
            url: url,
            page: page
        });
    }

    hidePages() {
        for(let i = 0; i < this.listOfPages.length; i++) {
            this.listOfPages[i].page.hidden = true;
        }
    }

    showPage() {
        this.hidePages();

        const url = window.location.pathname;

        for(let i = 0; i < this.listOfPages.length; i++) {
            if(url === this.listOfPages[i].url) {
                this.listOfPages[i].page.hidden = false;
                return;
            }
        }

        this.listOfPages[0].page.hidden = false;
        history.pushState({}, "", this.listOfPages[0].url);
    }

    moveToPage(url) {
        history.pushState({}, "", url);
        this.showPage();
    }
}
