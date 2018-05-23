"use strict";

/**
 * Проверка, состоит ли строка только из разрешённых символов
 * @param s
 * @returns {boolean}
 */
export default function isStringNormal(s) {
    const invalidStringRegex = /[^a-zA-Z0-9]/;
    const isInvalid = invalidStringRegex.test(s);
    return !isInvalid;
}
