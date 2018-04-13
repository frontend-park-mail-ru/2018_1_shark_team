"use strict";

import inRangeHit from "./HitControl";

const HIT_LEFT = 100;
const HIT_RIGHT = 240;

const ENEMY_SIZE = 80;

export default function enemiesHitRocket(enemiesArr, drawManager) {
    let gameFlag = true;

    enemiesArr.forEach((enemy) => {
        if(enemy.y === drawManager.rocket.y) {
            if(inRangeHit(HIT_LEFT, enemy.x, HIT_RIGHT) === true) {
                gameFlag = false;
            }

            if(inRangeHit(HIT_LEFT, enemy.x + ENEMY_SIZE, HIT_RIGHT) === true) {
                gameFlag = false;
            }
        }
    });

    return gameFlag;
}
