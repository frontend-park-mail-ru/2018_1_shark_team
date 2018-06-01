"use strict";

export default function drawLogins(login) {
    const loginUserStr = "Логин: " + login;
    document.querySelector(".main-menu-page__label").innerHTML = loginUserStr;
    document.querySelector(".my-page__user-login-label").innerHTML = loginUserStr;
    document.querySelector(".liders-page__login-label").innerHTML = loginUserStr;
}
