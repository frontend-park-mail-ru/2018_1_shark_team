"use strict";

import MessagePrinter from "./MessagePrinter";
import getApplicationMode from "./DebugMode";

const DEBUG_URL = "http://localhost:5005/";
const RELEASE_URL = "http://funny-race-backend-218.herokuapp.com/";

export default class AjaxWorker {
    constructor(url, body) {
        this.url = AjaxWorker.getBasicUrl() + url;
        this.body = body;
    }

    static getBasicUrl() {
        if(getApplicationMode()) {
            return DEBUG_URL;
        } else {
            return RELEASE_URL;
        }
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
