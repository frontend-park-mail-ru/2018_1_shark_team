"use strict";

import AjaxWorker from "./AjaxWorker";

export default class LiderBoardLoader {
    constructor(elementsBase) {
        this.elementsBase = elementsBase;
        this.elementsBase.getElement("lidersBox").innerHTML = "";
    }

    static initLiderBoardParams() {
        localStorage.setItem("startNumber", "0");
        localStorage.setItem("deltaNumber", "3");
    }

    static moveRight() {
        const startPosParam = localStorage.getItem("startNumber");
        const numberElementsParam = localStorage.getItem("deltaNumber");

        let startPos = parseInt(startPosParam);
        startPos += parseInt(numberElementsParam);

        localStorage.setItem("startNumber", startPos.toString());
    }

    static moveLeft() {
        const startPosParam = localStorage.getItem("startNumber");
        const numberElementsParam = localStorage.getItem("deltaNumber");

        let startPos = parseInt(startPosParam);
        startPos -= parseInt(numberElementsParam);

        if(startPos < 0) {
            startPos = 0;
        }

        localStorage.setItem("startNumber", startPos.toString());
    }

    loadLiders() {
        const startPosParam = localStorage.getItem("startNumber");
        const numberElementsParam = localStorage.getItem("deltaNumber");
        console.log("Liders paginate params: " + startPosParam + " " + numberElementsParam);

        const startPos = parseInt(startPosParam);
        const numberElements = parseInt(numberElementsParam);

        const elementsBase = this.elementsBase;

        new AjaxWorker("getliders", {
            startPos: startPos,
            numberElements: numberElements
        }, (result) => {
            const arr = JSON.parse(result);
            this.elementsBase.getElement("lidersBox").innerHTML = "";
            let htmlContent = "";

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
            }
        }).sendPost();
    }
}