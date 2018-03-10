"use strict";

export default class AjaxWorker {
    constructor(url, body, callback) {
        this.url = AjaxWorker.getBasicUrl() + url;
        this.body = body;
        this.callback = callback;
    }

    static getBasicUrl() {
        return "http://localhost:5005/";
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
                this.callback(answer);
                xhr = null;
            }
        }
    }
}

