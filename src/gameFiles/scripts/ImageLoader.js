"use strict";

import LogMessage from "./MessageLogger";

const ROCKET_IMAGE = "./../../gameFiles/images/rocketOK.png";
const ENEMY_IMAGE = "./../../gameFiles/images/enemyOK.png";
const FON_IMAGE = "./../../gameFiles/images/fonOK.png";
const BONUS_IMAGE = "./../../gameFiles/images/bonusLive.png";
const BALL_IMAGE = "./../../gameFiles/images/ballOK.png";
const STAR_IMAGE = "./../../gameFiles/images/star.png";

const IMAGES_NAMES_ARR = [ROCKET_IMAGE, ENEMY_IMAGE, FON_IMAGE, BONUS_IMAGE, BALL_IMAGE, STAR_IMAGE];


export default class ImageLoader {
    constructor(game) {
        LogMessage("create ImageLoader");
        this.initGameObj(game);
        this.createObjectsForSavingImages();
    }

    initGameObj(game) {
        this.game = game;
    }

    createObjectsForSavingImages() {
        this.dict = {
            ROCKET_IMAGE: null,
            ENEMY_IMAGE: null,
            FON_IMAGE: null,
            BONUS_IMAGE: null,
            BALL_IMAGE: null,
            STAR_IMAGE: null,
        };
    }

    getStar() {
        return this.dict[STAR_IMAGE];
    }

    getRocket() {
        return this.dict[ROCKET_IMAGE];
    }

    getEnemy() {
        return this.dict[ENEMY_IMAGE];
    }

    getFon() {
        return this.dict[FON_IMAGE];
    }

    getBonus() {
        return this.dict[BONUS_IMAGE];
    }

    getBall() {
        return this.dict[BALL_IMAGE];
    }

    downloadPicture(imageParam) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageParam;
            img.onload = () => {
                this.dict[imageParam.toString()] = img;
                resolve(img);
            };
            img.onerror = (error) => {
                reject(error);
            };
        });
    }

    downloadAllPictures() {
        return Promise.all(IMAGES_NAMES_ARR.map((element) => {
            this.downloadPicture(element.toString());
        }));
    }

    static printLoadingError(err) {
        LogMessage(err);
    }

    downloadRecources() {
        return this.downloadAllPictures()
            .catch((err) => {
                ImageLoader.printLoadingError(err);
            });
    }
}
