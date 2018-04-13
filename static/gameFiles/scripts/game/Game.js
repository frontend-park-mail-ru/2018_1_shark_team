"use strict";

import LogMessage from "../debug/MessageLogger";
import DrawManager from "../render/DrawManager";
import RocketMoveManager from "../rocket/RocketMoveManager";
import ImageLoader from "../imagesContent/ImageLoader";
import ScoreCounter from "../score/ScoreCounter";
import ScoreRender from "../score/ScoreRender";
import SpeedController from "../SpeedController";
import EnemiesController from "../enemies/EnemiesController";
import enemiesHitRocket from "../hitTest/EnemiesHitRocket";
import gameRepeating from "./gameRepeating";
import startAnimationOpacity from "./gameOpacityAnimation";

const ROCKET_START_POSITION_X = 100;
const ROCKET_START_POSITION_Y = 260;

const WAIT_TIME_INTEVAL = 35;

const START_COUNT_RIGHT_BORDER = 30;

export default class Game {
    constructor() {
        LogMessage("create Game");
        this.initDrawManager();
        this.initSpeedControlObj();
        this.initScoreObjects();
        this.initScore();
        this.createHeroRocket();
        this.createRocketMoveManager();
        this.initEnemiesObjects();
        this.createCounter();
        this.initCountRightBorder();
        this.setSpeed();
        this.initGameFlag();
        this.initImageLoader();
    }

    initImageLoader() {
        this.imageLoader = new ImageLoader(this);
        this.drawManager.initImageLoader(this.imageLoader);
    }

    initDrawManager() {
        this.drawManager = new DrawManager(document.querySelector(".canvas-box__canvas-plain"));
    }

    initSpeedControlObj() {
        this.speedController = new SpeedController();
    }

    initScoreObjects() {
        this.scoreCounter = new ScoreCounter();
        this.scoreRender = new ScoreRender();
    }

    initScore() {
        this.scoreRender.initCountLabel(document.querySelector(".count-field__count-label"));
        this.scoreCounter.initScore(0);
        this.scoreRender.printScore(this.scoreCounter.getScore());
    }

    addScore() {
        this.scoreCounter.addDeltaScore();
        this.scoreRender.printScore(parseInt(this.scoreCounter.getScore()));
    }

    initGameFlag() {
        this.gameFlag = true;
    }

    setSpeed() {
        this.speedController.setSpeed();
    }

    createCounter() {
        this.count = 0;
    }

    initCountRightBorder() {
        this.countRightBorder = START_COUNT_RIGHT_BORDER;
    }

    createHeroRocket() {
        this.drawManager.createRocket(ROCKET_START_POSITION_X, ROCKET_START_POSITION_Y);
    }

    initEnemiesObjects() {
        this.enemiesController = new EnemiesController();
        this.enemiesController.createEnemiesArray();
        this.enemiesArr = this.enemiesController.getEnemiesArray();
        this.drawManager.initEnemiesArray(this.enemiesArr);
    }

    printEnemiesNumber() {
        this.enemiesController.printEnemiesNumber();
    }

    addEnemiesLine() {
        this.enemiesController.addEnemiesLine(this.drawManager, this.enemiesArr);
    }

    controlHit() {
        this.gameFlag = enemiesHitRocket(this.enemiesArr, this.drawManager);
    }

    killEnemies() {
        this.enemiesArr = this.enemiesController.killEnemies(this.enemiesArr, this.drawManager);
    }

    moveAllEnemies() {
        this.enemiesController.moveAllEnemies(this.speedController);
    }

    createRocketMoveManager() {
        this.rocketMoveManager = new RocketMoveManager();
    }

    changeRocketPosition() {
        this.drawManager.rocket.y = this.rocketMoveManager.getRocketPosition();
    }

    printSpeedInfo() {
        this.speedController.printSpeedInfo();
    }

    printCountRightBorderInfo() {
        LogMessage("RightBorder: " + this.countRightBorder);
    }

    startRepeatingActions() {
        LogMessage("--- START GAME INTERVAL ---");
        this.interval = setInterval(() => {
            gameRepeating(this);
        }, WAIT_TIME_INTEVAL);
    }

    startAnimationOpacity() {
        startAnimationOpacity(this);
    }

    static renderRestartBtn() {
        document.querySelector(".one-player-page__start-game-button").hidden = false;
    }
}
