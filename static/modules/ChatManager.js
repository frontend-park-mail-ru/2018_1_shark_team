"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

const SOCKET_URL = "ws://funny-race-socket-server-123.herokuapp.com/";
const HELLO_MESSAGE = "HELLO_MESSAGE";

let socket = null;

export default class ChatManager {
    static getSocket() {
        return socket
    }

    static tryToConnect() {
        try {
            socket = new WebSocket(SOCKET_URL);
        } catch (err) {
            LogMessage("Socket connection error");
        }
    }

    static tryToAddSocketEvents() {
        try {
            socket.onopen = function() {
                LogMessage("Соединение установлено");
            };

            socket.onclose = function(event) {
                LogMessage("Соединение закрыто");
            };

            socket.onmessage = function(event) {
                LogMessage("Получено сообщение");

                const messageBox = document.querySelector(".chat-page__messages-box");
                messageBox.innerHTML = "";

                const arr = JSON.parse(event.data.toString());

                if(arr.length === 0) {
                    messageBox.innerHTML = "Сообщения отсутствуют";
                } else {
                    arr.forEach((element) => {
                        element = JSON.parse(element);
                        const div = document.createElement("div");
                        let login = document.createTextNode(element.login + ": ");
                        let message = document.createTextNode(element.message);
                        div.appendChild(login);
                        div.appendChild(message);
                        messageBox.appendChild(div);
                    });
                }
            };

            socket.onerror = function(error) {
                LogMessage("Ошибка сокета");
            };
        } catch (err) {
            LogMessage("Error of adding events to socket");
        }
    }

    static tryToClose() {
        try {
            socket.close();
        } catch (err) {
            LogMessage("Socket closing error");
        }
    }

    static tryToSendMessage(messageContent) {
        const login = localStorage.getItem("loginValue");
        const message = messageContent.toString();
        const obj = {
            login: login,
            message: message,
        };
        const objStr = JSON.stringify(obj);

        try {
            socket.send(objStr);
        } catch (err) {
            LogMessage("Sending message error");
        }
    }

    static tryToSendTemplateMessage() {
        try {
            socket.send(HELLO_MESSAGE);
        } catch (err) {
            LogMessage("Sending template message error");
        }
    }
}

////////////////////////////////////////////////

let interSocket = setInterval(() => {
    LogMessage("Template");
    ChatManager.tryToSendTemplateMessage();
}, 200);