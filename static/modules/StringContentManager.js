"use strict";

/**
 * класс для проверки валидности строк
 * строка считается валидной, если состоит из символов a-z, A-Z, 0-9
 */
export default class StringContentManager {
    constructor(stringParam) {
        this.s = stringParam;
    }

    /**
     * метод для проверки, является ли символ валидным
     * @param charParam
     * @returns {boolean}
     */
    static normalChar(charParam) {
        const c = charParam.toLowerCase();
        const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
        return allowedChars.indexOf(c) !== -1;
    }

    /**
     * метод для проверки, является ли строка валидной
     * строка валидная, когда все её символы валидные
     * @returns {boolean}
     */
    normalString() {
        const s = this.s;
        for(let i = 0; i < s.length; i++) {
            const c = s.charAt(i);
            if(StringContentManager.normalChar(c) === false) {
                return false;
            }
        }
        return true;
    }
}
