"use strict";

import LogMessage from "./MessageLogger";

const ROCKET_IMAGE = "./../../gameFiles/images/rocketOK.png";
const ENEMY_IMAGE = "./../../gameFiles/images/enemyOK.png";
const FON_IMAGE = "./../../gameFiles/images/fonOK.png";
const BONUS_IMAGE = "./../../gameFiles/images/bonusLive.png";
const BALL_IMAGE = "./../../gameFiles/images/ballOK.png";
const STAR_IMAGE = "./../../gameFiles/images/star.png";

export default class ImageLoader {
    constructor(game) {
        this.starObj = null;
        this.rocketObj = null;
        this.enemyObj = null;
        this.fonObj = null;
        this.bonusObj = null;
        this.ballObj = null;
        LogMessage("create ImageLoader");
        this.game = game;
        this.starImage = false;
        this.rocketImage = false;
        this.enemyImage = false;
        this.fonImage = false;
        this.bonusImage = false;
        this.ballImage = false;
        this.loadStar();
        this.loadRocket();
        this.loadEnemy();
        this.loadFon();
        this.loadBonus();
        this.loadBall();
    }

    getStar() {
        return this.starObj;
    }

    getRocket() {
        return this.rocketObj;
    }

    getEnemy() {
        return this.enemyObj;
    }

    getFon() {
        return this.fonObj;
    }

    getBonus() {
        return this.bonusObj;
    }

    getBall() {
        return this.ballObj;
    }

    startGame() {
        if(this.rocketImage && this.enemyImage && this.fonImage && this.bonusImage && this.ballImage && this.starImage) {
            this.rocketImage = false;
            this.enemyImage = false;
            this.fonImage = false;
            this.bonusImage = false;
            this.ballImage = false;
            this.starImage = false;
            this.game.startRepeatingActions();
        }
    }

    loadStar() {
        const img = new Image();
        img.src = STAR_IMAGE;
        img.onload = () => {
            this.starImage = true;
            this.starObj = img;
            this.startGame();
        }
    }

    loadBall() {
        const img = new Image();
        img.src = BALL_IMAGE;
        img.onload = () => {
            this.ballImage = true;
            this.ballObj = img;
            this.startGame();
        }
    }

    loadBonus() {
        const img = new Image();
        img.src = BONUS_IMAGE;
        img.onload = () => {
            this.bonusImage = true;
            this.bonusObj = img;
            this.startGame();
        }
    }

    loadRocket() {
        const img = new Image();
        img.src = ROCKET_IMAGE;
        img.onload = () => {
            this.rocketImage = true;
            this.rocketObj = img;
            this.startGame();
        }
    }

    loadEnemy() {
        const img = new Image();
        img.src = ENEMY_IMAGE;
        img.onload = () => {
            this.enemyImage = true;
            this.enemyObj = img;
            this.startGame();
        }
    }

    loadFon() {
        const img = new Image();
        img.src = FON_IMAGE;
        img.onload = () => {
            this.fonImage = true;
            this.fonObj = img;
            this.startGame();
        }
    }
}