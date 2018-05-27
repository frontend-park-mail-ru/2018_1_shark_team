"use strict";

import template from "./my-page.pug";
import AjaxWorker from "../../modules/network/AjaxWorker";
import AlertManager from "../../modules/render/AlertManager";
import LogMessage from "../../gameFiles/scripts/MessageLogger";

const FORMATS = ["JPEG", "JPG", "TIFF", "PSD", "BMP", "GIF", "PNG"];

export default class MyPage {
    constructor() {
        MyPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += template();
    }

    static addEventsToElements(router, elementsBase) {
        LogMessage("Router: " + router);

        document.querySelector(".form__save-changes-button").addEventListener("click", () => {
            const login = localStorage.getItem("loginValue");
            const image = elementsBase.getElement("userAvatarImage").src;

            let fileName = null;

            try {
                fileName = elementsBase.getElement("fileInputHiddenBtn").files[0].name + "";
            } catch (err) {
                // file error
            }

            LogMessage("FileName:" + fileName);

            if (!fileName) {
                new AlertManager().showAlertWindow("Файл не был выбран.", () => {
                    // close window
                });
                return null;
            }

            const arr = fileName.split(".");
            const type = arr[arr.length - 1].toUpperCase();
            LogMessage("FileType: " + type);

            if (FORMATS.indexOf(type) === -1) {
                new AlertManager().showAlertWindow("Ошибка в формате файла.", () => {
                    // close window
                });
                return null;
            }

            const promise = new AjaxWorker("saveavatar", {
                login: login,
                image: image
            }).sendPost();

            promise.then(() => {
                elementsBase.getElement("myPageMessageBox").innerHTML = "Сохранение прошло успешно.";
                new AlertManager().showAlertWindow("Сохранение прошло успешно.", () => {
                    // close window
                });
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
                const fileName = elementsBase.getElement("fileInputHiddenBtn").files[0].name + "";
                const arr = fileName.split(".");
                const type = arr[arr.length - 1].toUpperCase();
                LogMessage("FileType: " + type);
                if (FORMATS.indexOf(type) !== -1) {
                    elementsBase.getElement("userAvatarImage").src = e.target.result;
                }
            };
        });
    }
}
