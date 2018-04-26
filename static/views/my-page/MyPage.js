"use strict";

import template from "./my-page.pug";
import AjaxWorker from "../../modules/network/AjaxWorker";

export default class MyPage {
    constructor() {
        MyPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".my-page__main-menu-btn").addEventListener("click", () => {
            router.moveToPage("/main-menu");
        });

        document.querySelector(".form__save-changes-button").addEventListener("click", () => {
            const login = localStorage.getItem("loginValue");
            const image = elementsBase.getElement("userAvatarImage").src;

            const promise = new AjaxWorker("saveavatar", {
                login: login,
                image: image
            }).sendPost();

            promise.then(() => {
                elementsBase.getElement("myPageMessageBox").innerHTML = "Сохранение прошло успешно.";
            });
        });

        document.querySelector(".form__choose-image-button").addEventListener("click", () => {
            elementsBase.getElement("fileInputHiddenBtn").click();
        });

        elementsBase.getElement("fileInputHiddenBtn").addEventListener("change", () => {
            const file = elementsBase.getElement("fileInputHiddenBtn").files[0];
            const myReader = new FileReader();
            myReader.readAsDataURL(file);
            myReader.onload = (e) => {
                elementsBase.getElement("userAvatarImage").src = e.target.result;
            };
        });
    }
}
