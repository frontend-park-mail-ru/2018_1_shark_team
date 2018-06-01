export function pushSingleMenuView(html) {
    const menu = document.querySelector("#workspace-single-menu");
    const anotherMenu = document.querySelector("#workspace-double-menu");
    menu.hidden = false;
    anotherMenu.hidden = true;
    const root = menu;
    root.innerHTML = html;
}

export function pushDoubleMenuView(html) {
    const menu = document.querySelector("#workspace-double-menu");
    const anotherMenu = document.querySelector("#workspace-single-menu");
    menu.hidden = false;
    anotherMenu.hidden = true;
    const root = document.querySelector("#workspace-double-menu-content");
    root.innerHTML = html;
}

export function depushViews() {
    document.querySelector("#workspace-single-menu").innerHTML = "";
    document.querySelector("#workspace-double-menu-content").innerHTML = "";
}

