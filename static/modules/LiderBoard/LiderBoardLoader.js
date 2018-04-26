"use strict";

import AjaxWorker from "../network/AjaxWorker";
import MessagePrinter from "../render/MessagePrinter";
import LiderBoardRender from "./render/LiderBoardRender";

/**
 * класс для работы с таблицей лидеров
 */
class LiderBoardLoader {
    initLiderBoard(elementsBase) {
        this.elementsBase = elementsBase;
        this.render = new LiderBoardRender(elementsBase);
        this.render.clearBox();
        this.createLidersListParamSaver();
    }

    createLidersListParamSaver() {
        this.lidersListParams = {
            stopRightMoving: false,
            startNumber: 0,
            deltaNumber: 3
        };
    }

    /**
     * метод для инициализации номера лидера, с которого начинается показ
     */
    initLiderBoardParams() {
        this.lidersListParams.startNumber = 0;
        this.lidersListParams.deltaNumber = 3;
        this.lidersListParams.stopRightMoving = false;
    }

    /**
     * метод для просмотра следующих лидеров в таблице
     */
    moveRight() {
        if(!this.lidersListParams.stopRightMoving) {
            this.lidersListParams.startNumber += this.lidersListParams.deltaNumber;
        }
    }

    /**
     * метод для просмотра предыдущих лидеров в таблице
     */
    moveLeft() {
        this.lidersListParams.startNumber -= this.lidersListParams.deltaNumber;
        if(this.lidersListParams.startNumber < 0) {
            this.lidersListParams.startNumber = 0;
        }
        this.lidersListParams.stopRightMoving = false;
    }

    /**
     * метод для отправки запроса на сервер, получения списка лидеров и вывода их на экран
     */
    loadLiders() {
        MessagePrinter.write("Liders paginate params: " + this.lidersListParams.startNumber + " " + this.lidersListParams.deltaNumber);

        const promise = new AjaxWorker("getliders", {
            startPos: this.lidersListParams.startNumber,
            numberElements: this.lidersListParams.deltaNumber
        }).sendPost();

        promise.then((result) => {
            const arr = JSON.parse(result);
            this.render.clearBox();

            if(arr.length > 0) {
                this.render.writeArrContent(arr);
            } else {
                this.render.writeEmptyListMessage();
                this.lidersListParams.stopRightMoving = true;
            }
        });
    }
}

const liaderBoard = new LiderBoardLoader();

export default function getLiaderBoard() {
    return liaderBoard;
}