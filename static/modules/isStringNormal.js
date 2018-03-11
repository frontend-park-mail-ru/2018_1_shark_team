"use strict";

/**
 * Проверка, состоит ли строка только из разрешённых символов
 * @param s
 * @returns {boolean}
 */
export default function isStringNormal(s) {
    function normalChar(charParam) {
        const c = charParam.toLowerCase();
        const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
        return allowedChars.indexOf(c) !== -1;
    }

    for(let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if(normalChar(c) === false) {
            return false;
        }
    }
    return true;
}
