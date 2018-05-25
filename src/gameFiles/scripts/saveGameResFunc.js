"use strict";

import LogMessage from "./MessageLogger";
import AjaxWorker from "../../modules/network/AjaxWorker";

export default function saveGameResFunc(scoreParam) {
    const loginValue = localStorage.getItem("loginValue");
    if(!loginValue) {
        // user not auth
        LogMessage("USER NOT AUTH: save cancel");
        return null;
    }

    new AjaxWorker("savegameresult", {
        loginData: loginValue.toString(),
        scoreData: parseInt(scoreParam),
    }).getPromise()
        .then(() => {
            LogMessage("SAVE SCORE OK");
        });
}
