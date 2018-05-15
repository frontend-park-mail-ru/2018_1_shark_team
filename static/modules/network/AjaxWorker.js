"use strict";

import MessagePrinter from "../render/MessagePrinter";
import getApplicationMode from "../utils/DebugMode";

const DEBUG_URL = "http://localhost:8081";

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
                console.log("POST");
                xhr.open("POST", this.url, true);
            } else {
                console.log("GET");
                xhr.open("GET", this.url, true);
            }

            xhr.withCredentials = true;

            if(this.body) {
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            } else {
                xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            }

            if(this.body) {
                xhr.send(JSON.stringify(this.body));
            } else {
                xhr.send(null);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status < 300) {
                        const xhrResult = xhr.responseText.toString();
                        const status = xhr.status;
                        xhr = null;
                        const answer = xhrResult.toString();
                        const message = "Answer: " + answer;
                        if (message.length < 200) {
                            MessagePrinter.write(message);
                        }

                        console.log(xhrResult);
                        resolve(xhrResult);
                    } else {
                        reject("error string");
                    }
                }
            };

            xhr.onerror = (err) => {
                reject({type: 'connection', error: err});
            }
        });
    }

    sendPost() {
        return this.getPromise();
    }
}
