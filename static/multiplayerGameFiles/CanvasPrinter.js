"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

const WIDTH = 900;
const HEIGHT = 700;
const SIZE = 80;
const X_POSITION = 100;

export default class CanvasPrinter {
    constructor(imageLoader) {
        LogMessage("new CanvasPrinter");
        this.imageLoader = imageLoader;
        this.initCanvas();
        this.drawBackground();
        this.drawThreeLines();
        this.drawFirst(X_POSITION, 190);
        this.drawSecond(X_POSITION, 430);
    }

    initCanvas() {
        const can = document.querySelector(".canvas-multiplayer-box__canvas-plain");
        this.holst = can.getContext('2d');
        this.holst.lineWidth = 2;
    }

    printEnemy(e) {
        try {
            this.holst.drawImage(this.imageLoader.getEnemy(), e.x, e.y, SIZE, SIZE);
        } catch (err) {
            // enemy not loaded
        }
    }

    printBullet(b) {
        try {
            this.holst.drawImage(this.imageLoader.getBall(), b.x, b.y, SIZE, SIZE);
        } catch (err) {
            // bullet not loaded
        }
    }

    renderAll(p1, p2, e_1, e_2, b_1, b_2) {
        this.drawBackground();
        this.drawThreeLines();

        p1 = p1 * SIZE + 110;
        p2 = p2 * SIZE + 350;

        this.drawFirst(X_POSITION, p1);
        this.drawSecond(X_POSITION, p2);

        try {
            this.holst.drawImage(this.imageLoader.getRocket(), X_POSITION, p1, SIZE, SIZE);
        } catch (err) {
            // rocket not loaded
        }

        try {
            this.holst.drawImage(this.imageLoader.getRocket(), X_POSITION, p2, SIZE, SIZE);
        } catch (err) {
            // rocket not loaded
        }

        e_1.forEach((e) => {
            this.drawRectange("#2fb1d9", e.x, e.y);
            this.printEnemy(e);
        });

        e_2.forEach((e) => {
            this.drawRectange("#32d97e", e.x, e.y);
            this.printEnemy(e);
        });

        b_1.forEach((b) => {
            this.drawRectange("#ff1f1a", b.x, b.y);
            this.printBullet(b);
        });

        b_2.forEach((b) => {
            this.drawRectange("#ff1f1a", b.x, b.y);
            this.printBullet(b);
        });
    }

    drawBackground() {
        const holst = this.holst;
        holst.fillStyle = '#2d26ad';
        holst.fillRect(0, 0, WIDTH, HEIGHT);
        try {
            this.holst.drawImage(this.imageLoader.getFon(), 0, 0, WIDTH, HEIGHT);
        } catch (err) {
            // fon not loaded
        }
    }

    drawThreeLines() {
        function drawLine(holst, x1, y1, x2, y2) {
            holst.strokeStyle = "#ff1f1a";
            holst.beginPath();
            holst.moveTo(x1, y1);
            holst.lineTo(x2, y2);
            holst.closePath();
            holst.stroke();
        }

        drawLine(this.holst, 0, 110, WIDTH, 110);
        drawLine(this.holst, 0, 590, WIDTH, 590);
        drawLine(this.holst, 0, 350, WIDTH, 350);
    }

    drawRectange(color, xxx, yyy) {
        const holst = this.holst;
        holst.strokeStyle = color;
        /*
        holst.strokeRect(xxx, yyy, SIZE, SIZE);
        */
    }

    drawFirst(xxx, yyy) {
        this.drawRectange("#FFFFFF", xxx, yyy);
    }

    drawSecond(xxx, yyy) {
        this.drawRectange("#00FF00", xxx, yyy);
    }
}
