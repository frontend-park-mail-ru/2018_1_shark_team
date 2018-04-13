"use strict";

import LogMessage from "./MessageLogger";
import GraphicsCreator from "./GraphicsCreator";
import HeroesInfoGetter from "./HeroesInfoGetter";
import getDebugMode from "./DebugModeSetter";
import FonAnimationControl from "./FonAnimationControl";
import renderEnemies from "./enemiesRender";

const SIMPLE_BACKGROUND_COLOR = "#534d94";
const HOLST_WIDTH = 900;
const HOLST_HEIGHT = 600;
const LINE_WIDTH = 2;

const BORDER_LINES_STYLE = "#2bbab3";
const BORDER_TOP_Y = 100;
const BORDER_BOTTOM_Y = 500;

const ENEMY_SIZE = 80;

const ROCKET_WIDTH = 140;
const ROCKET_HEIGHT = 80;

export default class DrawManager {
    constructor(canvasPlain) {
        LogMessage("create DrawManager");
        this.holst = canvasPlain.getContext("2d");
        this.holst.lineWidth = LINE_WIDTH;
        this.fonAnimationControl = new FonAnimationControl();
        this.initFonAngle();
        this.drawSimpleBackGround();
    }

    initFonAngle() {
        this.fonAnimationControl.initFonAngle(0);
    }

    getHolst() {
        return this.holst;
    }

    drawSimpleBackGround() {
        this.holst.fillStyle = SIMPLE_BACKGROUND_COLOR;
        this.holst.fillRect(0, 0, HOLST_WIDTH, HOLST_HEIGHT);

        this.fonAnimationControl.addDeltaAngle();
        this.fonAnimationControl.controlAngleValue();
        this.fonAnimationControl.findNewFonPosition();

        try {
            this.holst.drawImage(this.imageLoader.getFon(), this.fonAnimationControl.getFonX(), this.fonAnimationControl.getFonY(), FonAnimationControl.getFonImageWidth(), FonAnimationControl.getFonImageHeight());
        } catch (err) {
            // fon not loaded
        }

        this.drawBorderLines();
    }

    drawBorderLines() {
        this.holst.strokeStyle = BORDER_LINES_STYLE;
        this.holst.setLineDash([50, 30]);
        GraphicsCreator.drawLine(0, BORDER_TOP_Y, HOLST_WIDTH, BORDER_TOP_Y, this.holst);
        GraphicsCreator.drawLine(0, BORDER_BOTTOM_Y, HOLST_WIDTH, BORDER_BOTTOM_Y, this.holst);
    }

    createRocket(x, y) {
        this.rocket = {
            x: x,
            y: y,
        };
        this.rocketGraphics = new GraphicsCreator(HeroesInfoGetter.getRocketPointsArray(), HeroesInfoGetter.getRocketColor(), this.holst);
        this.drawRocket();
    }

    drawRocket() {
        if(getDebugMode() === true) {
            this.rocketGraphics.drawGraphicsObject(this.rocket.x, this.rocket.y);
        }

        try {
            this.holst.drawImage(this.imageLoader.getRocket(), this.rocket.x, this.rocket.y, ROCKET_WIDTH, ROCKET_HEIGHT);
        } catch (err) {
            // rocket not loaded
        }
    }

    initEnemiesArray(enemiesArr) {
        this.enemiesArr = enemiesArr;
    }

    initImageLoader(imageLoader) {
        this.imageLoader = imageLoader;
    }

    drawAllEnemies() {
        renderEnemies(this.enemiesArr, this.holst, ENEMY_SIZE, this.imageLoader);
    }

    renderAll() {
        this.drawSimpleBackGround();
        this.drawRocket();
        this.drawAllEnemies();
    }
}
