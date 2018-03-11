"use strict";

import AjaxWorker from "./AjaxWorker";
import MessagePrinter from "./MessagePrinter";

let stopRightMoving = false;

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
        localStorage.setItem("startNumber", "0");
        localStorage.setItem("deltaNumber", "3");
        stopRightMoving = false;
    }

    /**
     * метод для просмотра следующих лидеров в таблице
     */
    static moveRight() {
        if(stopRightMoving === false) {
            const startPosParam = localStorage.getItem("startNumber");
            const numberElementsParam = localStorage.getItem("deltaNumber");

            let startPos = parseInt(startPosParam);
            startPos += parseInt(numberElementsParam);

            localStorage.setItem("startNumber", startPos.toString());
        }
    }

    /**
     * метод для просмотра предыдущих лидеров в таблице
     */
    static moveLeft() {
        const startPosParam = localStorage.getItem("startNumber");
        const numberElementsParam = localStorage.getItem("deltaNumber");

        let startPos = parseInt(startPosParam);
        startPos -= parseInt(numberElementsParam);

        if(startPos < 0) {
            startPos = 0;
        }

        stopRightMoving = false;

        localStorage.setItem("startNumber", startPos.toString());
    }

    /**
     * метод для отправки запроса на сервер, получения списка лидеров и вывода их на экран
     */
    loadLiders() {
        const startPosParam = localStorage.getItem("startNumber");
        const numberElementsParam = localStorage.getItem("deltaNumber");
        MessagePrinter.write("Liders paginate params: " + startPosParam + " " + numberElementsParam);

        const startPos = parseInt(startPosParam);
        const numberElements = parseInt(numberElementsParam);

        new AjaxWorker("getliders", {
            startPos: startPos,
            numberElements: numberElements
        }, (result) => {
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
                stopRightMoving = true;
            }
        }).sendPost();
    }
}