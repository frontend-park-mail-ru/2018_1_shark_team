"use strict";

export default class AjaxWorker {
    static getBasicUrl() {
        return "http://localhost:5005/";
    }

    static sendPost(url, body, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", AjaxWorker.getBasicUrl() + url, true);
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(body));
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                const answer = xhr.responseText.toString();
                callback(answer);
                xhr = null;
            }
        }
    }
}
