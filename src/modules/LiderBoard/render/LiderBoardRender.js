"use strict";

export default class LiderBoardRender {
    constructor() {
    }

    clearBox() {
        document.querySelector(".liders-page__liders-list-box").innerHTML = "";
    }

    writeArrContent(arr) {
        let tableContent = "<table>";
        arr.forEach((element) => {
            let image = element.imagePlayer;
            if(image === "IMAGE_NOT_SET") {
                image = "./images/userImage.jpg";
            }
            const content = "<tr><td>" +  element.playerPlace.toString() + "</td><td>" + "<img width = '50px' height = '50px' src = '" + image + "'>" + "</td><td>" + element.login + "</td><td>" + element.score + "</td></tr>";
            tableContent += content.toString();
        });
        tableContent += "</table>";
        document.querySelector(".liders-page__liders-list-box").innerHTML = tableContent;
    }

    writeEmptyListMessage() {
        const content = "Список окончен";
        const h3 = document.createElement("h3");
        const text = document.createTextNode(content);
        h3.appendChild(text);
        document.querySelector(".liders-page__liders-list-box").appendChild(h3);
    }
}
