"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

export default class ChatManager {
    static sendMessage(messageContent) {
        LogMessage(messageContent);
    }
}