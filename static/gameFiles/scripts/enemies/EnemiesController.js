"use strict";

import LogMessage from "../debug/MessageLogger";
import HeroesInfoGetter from "../HeroesInfoGetter";
import GraphicsCreator from "../render/GraphicsCreator";
import getRandomNumber from "../RandomGetter";
import getDebugMode from "../debug/DebugModeSetter";

const START_ENEMY_X_POSITION = 1000;
const START_ENEMY_Y_POSITION = 100;
const ENEMY_DELETE_X_POSITION = -150;
const ENEMY_HEIGHT = 80;

const LINES_ARRAY = [
    [0,0,0,1,1],
    [0,0,1,0,1],
    [0,0,1,1,0],
    [0,1,0,0,1],
    [0,1,0,1,0],
    [0,1,1,0,0],
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
];

export default class EnemiesController {
    constructor() {
        this.enemiesArr = null;
    }

    createEnemiesArray() {
        this.enemiesArr = [];
    }

    getEnemiesArray() {
        return this.enemiesArr;
    }

    printEnemiesNumber() {
        LogMessage("Enemies: " + this.enemiesArr.length);
    }

    addEnemiesLine(drawManager, enemiesArr) {
        const lineNumber = getRandomNumber(LINES_ARRAY.length);
        const arr = LINES_ARRAY[lineNumber];
        arr.forEach((number, i) => {
            if(number === 0) {
                let render = null;
                if(getDebugMode() === true) {
                    render = new GraphicsCreator(HeroesInfoGetter.getFirstEnemyPointsArray(), HeroesInfoGetter.getFirstEnemyColor(), drawManager.getHolst());
                }

                enemiesArr.push({
                    x: START_ENEMY_X_POSITION,
                    y: ENEMY_HEIGHT * i + START_ENEMY_Y_POSITION,
                    render: render,
                });
            }
        });
    }

    killEnemies(enemiesArr, drawManager) {
        const bufferEnemies = [];
        enemiesArr.forEach((enemy) => {
            if(enemy.x > ENEMY_DELETE_X_POSITION) {
                bufferEnemies.push(enemy);
            }
        });

        this.enemiesArr = bufferEnemies;
        drawManager.initEnemiesArray(this.enemiesArr);
        return bufferEnemies;
    }

    moveAllEnemies(speedController) {
        this.enemiesArr.forEach((enemy) => {
            enemy.x -= speedController.getSpeed();
        });
    }
}
