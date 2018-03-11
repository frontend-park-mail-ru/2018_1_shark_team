"use strict";

import AjaxWorker from "./AjaxWorker";

export default class LiderBoardLoader {
    constructor(elementsBase) {
        this.elementsBase = elementsBase;
    }

    loadLiders(startPosParam, numberElementsParam) {
        const startPos = parseInt(startPosParam);
        const numberElements = parseInt(numberElementsParam);

        const elementsBase = this.elementsBase;

        new AjaxWorker("getliders", {
            startPos: startPos,
            numberElements: numberElements
        }, (result) => {

        }).sendPost();
    }
}