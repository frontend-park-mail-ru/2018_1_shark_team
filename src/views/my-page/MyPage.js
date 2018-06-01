"use strict";

import template from "./my-page.pug";
import AjaxWorker from "../../modules/network/AjaxWorker";
import AlertManager from "../../modules/render/AlertManager";
import LogMessage from "../../gameFiles/scripts/MessageLogger";
import {pushDoubleMenuView} from "../../util/view-util";

const FORMATS = ["JPEG", "JPG", "TIFF", "PSD", "BMP", "GIF", "PNG"];

export default class MyPage {
    constructor() {
    }

    render() {
        pushDoubleMenuView(template());
        this._drawLogin();
    }

    addEventsToElements(router) {
        LogMessage("Router: " + router);

        document.querySelector(".form__save-changes-button").addEventListener("click", () => {
            const login = localStorage.getItem("loginValue");
            const image = document.querySelector(".form__user-avatar-image").src;

            let fileName = null;

            try {
                fileName = document.querySelector(".form__file-button").files[0].name + "";
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
                document.querySelector(".my-page__message-box").innerHTML = "Сохранение прошло успешно.";
                new AlertManager().showAlertWindow("Сохранение прошло успешно.", () => {
                    // close window
                });
            });
        });

        document.querySelector(".form__choose-image-button").addEventListener("click", () => {
            document.querySelector(".form__file-button").click();
        });

        document.querySelector(".form__file-button").addEventListener("change", () => {
            const file = document.querySelector(".form__file-button").files[0];
            const myReader = new FileReader();
            myReader.readAsDataURL(file);
            myReader.onload = (e) => {
                const fileName = document.querySelector(".form__file-button").files[0].name + "";
                const arr = fileName.split(".");
                const type = arr[arr.length - 1].toUpperCase();
                LogMessage("FileType: " + type);
                if (FORMATS.indexOf(type) !== -1) {
                    document.querySelector(".form__user-avatar-image").src = e.target.result;
                }
            };
        });
    }

    _drawLogin() {
        const loginValueStr = "Логин: " + localStorage.getItem("loginValue");
        document.querySelector(".my-page__user-login-label").innerHTML = loginValueStr;
    }
}
