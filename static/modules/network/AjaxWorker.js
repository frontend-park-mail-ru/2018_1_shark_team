"use strict";

import MessagePrinter from "../render/MessagePrinter";
import getApplicationMode from "../utils/DebugMode";

const DEBUG_URL = "http://localhost:5005/";

/* const RELEASE_URL = "http://funny-race-backend-server-1234.herokuapp.com/"; */
const RELEASE_URL = "https://tp-sharkteam-backend.herokuapp.com/";

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
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            if(this.body) {
                xhr.open("POST", this.url, true);
            } else {
                xhr.open("GET", this.url, true);
            }
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            if(this.body) {
                xhr.send(JSON.stringify(this.body));
            } else {
                xhr.send(null);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const xhrResult = xhr.responseText.toString();
                    xhr = null;
                    const answer = xhrResult.toString();
                    const message = "Answer: " + answer;
                    if (message.length < 200) {
                        MessagePrinter.write(message);
                    }

                    const resObj = {
                        xhrResult: xhrResult,
                        status: xhr.status,
                    };

                    resolve(resObj);
                }
            };
        });
    }

    sendPost() {
        return this.getPromise();
    }
}
