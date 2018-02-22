"use strict";

export default class StringContentManager {
    static normalChar(charParam) {
        const c = charParam.toLowerCase();
        const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
        return allowedChars.indexOf(c) !== -1;
    }

    static normalString(stringParam) {
        const s = stringParam;
        for(let i = 0; i < s.length; i++) {
            const c = s.charAt(i);
            if(StringContentManager.normalChar(c) === false) {
                return false;
            }
        }
        return true;
    }
}
