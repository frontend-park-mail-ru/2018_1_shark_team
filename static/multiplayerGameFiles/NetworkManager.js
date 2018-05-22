"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";
import SocketMessagesRouter from "./SocketMessagesRouter";

const ERROR = "Ошибка веб-сокета";
const MESSAGE = "Получено сообщение: ";
const CONNECTION = "Соединение установлено";
const CLOSE = "Соединение закрыто";

export default class NetworkManager {
    constructor(socket_url) {
        this.startSocket(socket_url);
    }

    addOpenEvent() {
        this.socket.onopen = () => {
            LogMessage(CONNECTION);
        };
    }

    addCloseEvent() {
        this.socket.onclose = () => {
            LogMessage(CLOSE);
        };
    }

    addErrorEvent() {
        this.socket.onerror = () => {
            LogMessage(ERROR);
        };
    }

    addMessageEvent() {
        this.socket.onmessage = (event) => {
            LogMessage(MESSAGE + event.data.toString());
            this.socketMessagesRouter.routeMessage(event.data.toString());
        };
    }

    addSocketEvents() {
        this.addOpenEvent();
        this.addCloseEvent();
        this.addErrorEvent();
        this.addMessageEvent();
    }

    startSocket(socket_url) {
        this.socket = new WebSocket(socket_url.toString());
        this.createMessagesRouter();
        this.addSocketEvents();
    }

    createMessagesRouter() {
        this.socketMessagesRouter = new SocketMessagesRouter(this.socket);
    }
}
