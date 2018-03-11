"use strict";

import MessagePrinter from "./MessagePrinter";

export default class AjaxWorker {
    constructor(url, body, callback) {
        this.url = AjaxWorker.getBasicUrl() + url;
        this.body = body;
        this.callback = callback;
    }

    static getBasicUrl() {
        return "http://localhost:5005/";
        //return "http://funny-race-server.herokuapp.com/";
    }

    getPromise() {
        return new Promise((resolve) => {
            // init xhr properties
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(this.body));
            MessagePrinter.write("SendQuery");

            // on getting result from server
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    MessagePrinter.write("GetAnswerFromServer");
                    const xhrResult = xhr.responseText.toString();
                    xhr = null;
                    resolve(xhrResult);
                }
            };
        });
    }

    sendPost() {
        this.getPromise().then(
            (xhrResult) => {
                MessagePrinter.write("getPromiseThen");
                const answer = xhrResult.toString();
                const message = "Answer: " + answer;
                if (message.length < 200) {
                    MessagePrinter.write(message);
                }
                this.callback(answer);
            }
        );
    }
}

