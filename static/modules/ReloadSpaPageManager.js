"use strict";

import UserAvatarLoader from "./UserAvatarLoader";

export default class ReloadSpaPageManager {
    constructor(login, elementsBase) {
        this.login = login;
        this.elementsBase = elementsBase;
    }

    reloadSpa() {
        const login = this.login;
        localStorage.setItem("loginValue", login);
        const loginUserStr = "User: " + login;
        this.elementsBase.getElement("mainMenuLoginLabel").innerHTML = loginUserStr;
        this.elementsBase.getElement("myPageLoginLabel").innerHTML = loginUserStr;
        this.elementsBase.getElement("lidersPageLoginLabel").innerHTML = loginUserStr;
        new UserAvatarLoader(this.elementsBase, login).loadAvatar();
    }
}
