"use strict";

import LogMessage from "../debug/MessageLogger";

const COUNT_LEFT_BORDER = 16.25;
const DELTA_COUNT_RIGHT_BORDER = 0.1;

export default function gameRepeating (game) {
    if(game.gameFlag === true) {
        game.count += 1;
        if (game.count === parseInt(game.countRightBorder)) {
            game.count = 0;
            if (game.countRightBorder >= COUNT_LEFT_BORDER) {
                game.countRightBorder -= DELTA_COUNT_RIGHT_BORDER;
            }
            game.addEnemiesLine();
            game.speedController.controlSpeed();
            game.printSpeedInfo();
            game.printCountRightBorderInfo();
        }
        game.killEnemies();
        game.changeRocketPosition();
        game.moveAllEnemies();
        game.drawManager.renderAll();
        game.addScore();
        game.controlHit();
    } else {
        clearInterval(game.interval);
        LogMessage("--- STOP GAME INTERVAL ---");
        game.startAnimationOpacity();
    }
}
