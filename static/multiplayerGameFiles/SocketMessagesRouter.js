"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";
import createOrJoinToRoom from "./createOrJoinToRoom";

const PING = "PING";
const TO_SERVER = "На сервер: ";
const SENDING_ERROR = "Ошибка отправки ...";

export default class SocketMessagesRouter {
    constructor(socket) {
        this.socket = socket;
        this.roomOK = false;
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


    }
}
