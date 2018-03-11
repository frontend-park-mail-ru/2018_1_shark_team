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

    sendPost() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", this.url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(this.body));
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                const answer = xhr.responseText.toString();

                const message = "Answer: " + answer;
                if(message.length < 200) {
                    MessagePrinter.write(message);
                }

                this.callback(answer);
                xhr = null;
            }
        };
    }
}

