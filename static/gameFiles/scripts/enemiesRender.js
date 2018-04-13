"use strict";

import getDebugMode from "./DebugModeSetter";
import LogMessage from "./MessageLogger";

export default function renderEnemies(enemiesArr, holst, enemySize, imageLoader) {

    if(enemiesArr !== null) {
        if(getDebugMode() === true) {
            enemiesArr.forEach((enemy) => {
                enemy.render.drawGraphicsObject(enemy.x, enemy.y);
            });
        }

        enemiesArr.forEach((enemy) => {
            try {
                holst.drawImage(imageLoader.getEnemy(), enemy.x, enemy.y, enemySize, enemySize);
            } catch (err) {
                LogMessage("Enemy not loaded");
            }
        });
    }
}
