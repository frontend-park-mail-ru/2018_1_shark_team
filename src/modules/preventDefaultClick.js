"use strict";

const LINK_NAME = "a";

export default function preventDefaultClick(router) {
    // prevent default
    document.addEventListener("click", (event) => {
        // it is NOT link
        if (event.target.tagName.toUpperCase() !== LINK_NAME.toUpperCase()) {
            return null;
        }
        // it is a link
        event.preventDefault();
        router.moveToPage(event.target.href);
    });
}
