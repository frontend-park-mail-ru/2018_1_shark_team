"use strict";

import MessagePrinter from "./MessagePrinter";

export default class AjaxWorker {
    constructor(url, body) {
        this.url = AjaxWorker.getBasicUrl() + url;
        this.body = body;
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

            // on getting result from server
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const xhrResult = xhr.responseText.toString();
                    xhr = null;
                    const answer = xhrResult.toString();
                    const message = "Answer: " + answer;
                    if (message.length < 200) {
                        MessagePrinter.write(message);
                    }
                    resolve(xhrResult);
                }
            };
        });
    }

    sendPost() {
        return this.getPromise();
    }
}
