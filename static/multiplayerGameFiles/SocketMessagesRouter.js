"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";
import createOrJoinToRoom from "./createOrJoinToRoom";
import showGameCanvas from "./showGameCanvas";
import CanvasPrinter from "./CanvasPrinter";
import KeyManager from "./KeyManager";
import gameOverRender from "./gameOverRender";

const PING = "PING";
const TO_SERVER = "На сервер: ";
const SENDING_ERROR = "Ошибка отправки ...";
const START_GAME_STRING = "P_START";

export default class SocketMessagesRouter {
    constructor(socket, imageLoader) {
        this.imageLoader = imageLoader;
        this.socket = socket;
        this.roomOK = false;
        this.canvasPrinter = new CanvasPrinter(this.imageLoader);
        this.keyManager = new KeyManager();
    }

    sendMessage(message) {
        try {
            LogMessage(TO_SERVER + message);
            this.socket.send(message.toString());
        } catch (err) {
            LogMessage(SENDING_ERROR);
        }
    }

    routeMessage(message) {
        // отправляем сообщение серверу
        this.sendMessage(PING);
        /////////////////////////////////

        const obj = JSON.parse(message.toString());

        // create or join room
        if(this.roomOK === false) {
            if (obj.rooms) {
                const result = createOrJoinToRoom(obj.rooms);
                if (result) {
                    this.sendMessage(result);
                    this.roomOK = true;
                }
                return null;
            }
        }

        // room was deleted by server
        if(obj.delete) {
            // reload page
            location.reload();
        }

        // game over
        if(obj.gameOver) {
            gameOverRender(obj);
            return null;
        }

        // start game with enemy
        if(obj.play === START_GAME_STRING) {
            // show canvas
            showGameCanvas();
            // init key events
            LogMessage("ADD KEY EVENTS");
            this.keyManager.initKeys();
            this.keyManager.initCallbacks(() => {
                this.sendMessage(JSON.stringify({
                    t: "c",
                    v: "UP",
                }));
            }, () => {
                this.sendMessage(JSON.stringify({
                    t: "c",
                    v: "DOWN",
                }));
            }, () => {
                this.sendMessage(JSON.stringify({
                    t: "c",
                    v: "FIRE",
                }));
            });
            this.keyManager.addEventsToKeys();
            /////////////
            return null;
        }

        // get game objects for printing
        if(obj.game) {
            // get heroes position
            const p1 = parseInt(obj.p1);
            const p2 = parseInt(obj.p2);
            // render all game content
            this.canvasPrinter.renderAll(p1, p2, obj.e_1, obj.e_2, obj.b_1, obj.b_2);
        }
    }
}
