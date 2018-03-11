"use strict";

import AjaxWorker from "./AjaxWorker";
import MessagePrinter from "./MessagePrinter";

/**
 * Объект для хранения свойств показа списка лидеров
 * @type {{stopRightMoving: boolean, startNumber: number, deltaNumber: number}}
 */
const lidersListParams = {
    stopRightMoving: false,
    startNumber: 0,
    deltaNumber: 3
};

/**
 * класс для работы с таблицей лидеров
 */
export default class LiderBoardLoader {
    /**
     * конструктор, в котором идёт инициализация словаря с DOM объектами и очистка бокса с лидерами
     * @param elementsBase
     */
    constructor(elementsBase) {
        this.elementsBase = elementsBase;
        this.elementsBase.getElement("lidersBox").innerHTML = "";
    }

    /**
     * метод для инициализации номера лидера, с которого начинается показ
     */
    static initLiderBoardParams() {
        lidersListParams.startNumber = 0;
        lidersListParams.deltaNumber = 3;
        lidersListParams.stopRightMoving = false;
    }

    /**
     * метод для просмотра следующих лидеров в таблице
     */
    static moveRight() {
        if(lidersListParams.stopRightMoving === false) {
            lidersListParams.startNumber += lidersListParams.deltaNumber;
        }
    }

    /**
     * метод для просмотра предыдущих лидеров в таблице
     */
    static moveLeft() {
        lidersListParams.startNumber -= lidersListParams.deltaNumber;
        if(lidersListParams.startNumber < 0) {
            lidersListParams.startNumber = 0;
        }
        lidersListParams.stopRightMoving = false;
    }

    /**
     * метод для отправки запроса на сервер, получения списка лидеров и вывода их на экран
     */
    loadLiders() {
        MessagePrinter.write("Liders paginate params: " + lidersListParams.startNumber + " " + lidersListParams.deltaNumber);

        const promise = new AjaxWorker("getliders", {
            startPos: lidersListParams.startNumber,
            numberElements: lidersListParams.deltaNumber
        }).sendPost();

        promise.then((result) => {
            const arr = JSON.parse(result);
            this.elementsBase.getElement("lidersBox").innerHTML = "";

            if(arr.length > 0) {
                arr.forEach((element) => {
                    const content = element.login + " : " + element.score;
                    const div = document.createElement("div");
                    const text = document.createTextNode(content);
                    div.appendChild(text);
                    this.elementsBase.getElement("lidersBox").appendChild(div);
                });
            } else {
                const content = "Список окончен";
                const h3 = document.createElement("h3");
                const text = document.createTextNode(content);
                h3.appendChild(text);
                this.elementsBase.getElement("lidersBox").appendChild(h3);
                lidersListParams.stopRightMoving = true;
            }
        });
    }
}
