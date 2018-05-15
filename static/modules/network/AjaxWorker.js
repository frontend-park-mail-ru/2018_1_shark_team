"use strict";

import MessagePrinter from "../render/MessagePrinter";
import getApplicationMode from "../utils/DebugMode";

// урл для отладки (на локалке)
const DEBUG_URL = "http://localhost:8081";
// урл в интернете
const RELEASE_URL = "https://tp-sharkteam-backend.herokuapp.com/";

/**
 * класс для отправки запросов на сервер
 */
export default class AjaxWorker {
    /**
     * конструктор для инициализации части урла запроса и тела запроса
     * @param url - часть урла запроса
     * @param body
     */
    constructor(url, body) {
        // инициализация урла
        this.url = AjaxWorker.getBasicUrl() + url;
        // инициализация теа запроса (если это GET запрос, то null)
        this.body = body;
    }

    /**
     * получение начала урла (различется для рабочего режима и режима отладки)
     * @returns {string}
     */
    static getBasicUrl() {
        if(getApplicationMode()) {
            return DEBUG_URL;
        } else {
            return RELEASE_URL;
        }
    }

    /**
     * метод для отправки запроса (возвращает промис)
     * @returns {Promise<any>}
     */
    getPromise() {
        // возвращаем промис
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            // если тело существует
            if(this.body) {
                console.log("POST");
                // создаём POST запрос
                xhr.open("POST", this.url, true);
            } else {
                console.log("GET");
                // создаём GET запрос
                xhr.open("GET", this.url, true);
            }
            // разрешаем работу с печеньками
            xhr.withCredentials = true;
            // в зависимости от типа запроса (POST или GET) задаём mime тип
            if(this.body) {
                // для POST запроса
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            } else {
                // для GET запроса
                xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            }
            // если это POST запрос
            if(this.body) {
                // отправляем тело запроса
                xhr.send(JSON.stringify(this.body));
            } else {
                // отправляем пустое тело
                xhr.send(null);
            }
            // при получении ответа от сервера
            xhr.onreadystatechange = () => {
                // если пришёл последний пакет
                if (xhr.readyState === 4) {
                    // если код НЕ ошибочный
                    if (xhr.status < 300) {
                        resolve(xhr);
                    } else {
                        reject(xhr);
                    }
                }
            };
        });
    }

    /**
     * метод для отправки запроса и получения промиса
     * @returns {Promise<any>}
     */
    sendPost() {
        return this.getPromise();
    }
}
