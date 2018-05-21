"use strict";

export default function drawLogins (login, elementsBase) {
    const loginUserStr = "Пользователь: " + login;
    elementsBase.getElement("mainMenuLoginLabel").innerHTML = loginUserStr;
    elementsBase.getElement("myPageLoginLabel").innerHTML = loginUserStr;
    elementsBase.getElement("lidersPageLoginLabel").innerHTML = loginUserStr;
}
