"use strict";

import MessagePrinter from "../render/MessagePrinter";
import getApplicationMode from "../utils/DebugMode";

const DEBUG_URL = "http://localhost:5123/api/";
const RELEASE_URL = "https://shark-team-v2.reo7sp.ru/api/";  // TODO set to "https://funny-race.xyz/api/"

export default class AjaxWorker {
    constructor(url, body) {
        this.url = AjaxWorker.getBasicUrl() + url;
        this.body = body;
    }

    static getBasicUrl() {
        if (getApplicationMode()) {
            return DEBUG_URL;
        } else {
            return RELEASE_URL;
        }
    }

    getPromise() {
        return new Promise((resolve, reject) => {
            // init xhr properties
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            //////////////////////
            /*
                xhr.setRequestHeader("Access-Control-Max-Age", "300");
            */
            //////////////////////
            try {
                xhr.send(JSON.stringify(this.body));
            } catch (err) {
                reject(err);
            }

            // on getting result from server
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const xhrResult = xhr.responseText.toString();
                    const status = xhr.status;
                    xhr = null;
                    const answer = xhrResult.toString();
                    const message = "Answer: " + answer;
                    if (status !== 200) {
                        MessagePrinter.write(message);
                        reject(new TypeError("not 200"));
                        return;
                    }
                    resolve(xhrResult);
                }
            };

            xhr.onerror = () => {
                reject(new TypeError("Network request failed"));
            };
        });
    }

    sendPost() {
        return this.getPromise();
    }
}
