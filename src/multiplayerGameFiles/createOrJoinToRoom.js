"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";

const NO_PLACE = "НЕТ МЕСТ";

export default function createOrJoinToRoom(rooms) {
    // rooms list empty
    if (rooms.length === 0) {
        // create room
        LogMessage("Create room");
        return JSON.stringify({
            t: "r",
            n: localStorage.getItem("loginValue"),
        });
    }

    // rooms list NOT empty

    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i].toString();
        // room have free place
        if (room.indexOf(NO_PLACE) === -1) {
            // join room
            LogMessage("Join room");
            return JSON.stringify({
                t: "j",
                n: room,
            });
        }
    }

    // all rooms have NOT free place

    // create room
    LogMessage("Create room");
    return JSON.stringify({
        t: "r",
        n: localStorage.getItem("loginValue"),
    });
}