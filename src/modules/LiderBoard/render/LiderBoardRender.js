"use strict";

export default class LiderBoardRender {
    constructor(elementsBase) {
        this.elementsBase = elementsBase;
    }

    clearBox() {
        this.elementsBase.getElement("lidersBox").innerHTML = "";
    }

    writeArrContent(arr) {
        arr.forEach((element) => {
            const content = element.login + " : " + element.score;
            const div = document.createElement("div");
            const text = document.createTextNode(content);
            div.appendChild(text);
            this.elementsBase.getElement("lidersBox").appendChild(div);
        });
    }

    writeEmptyListMessage() {
        const content = "Список окончен";
        const h3 = document.createElement("h3");
        const text = document.createTextNode(content);
        h3.appendChild(text);
        this.elementsBase.getElement("lidersBox").appendChild(h3);
    }
}
