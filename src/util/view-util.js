export function pushSingleMenuView(html) {
    document.querySelector("#workspace-double-menu").classList.add("hidden");
    document.querySelector("#workspace-double-menu-content").innerHTML = "";

    const menu = document.querySelector("#workspace-single-menu");
    menu.classList.remove("hidden");
    const root = document.querySelector("#workspace-single-menu-content");
    root.innerHTML = html;
}

export function pushDoubleMenuView(html) {
    document.querySelector("#workspace-single-menu").classList.add("hidden");
    document.querySelector("#workspace-single-menu-content").innerHTML = "";

    const menu = document.querySelector("#workspace-double-menu");
    menu.classList.remove("hidden");
    const root = document.querySelector("#workspace-double-menu-content");
    root.innerHTML = html;
}

export function depushViews() {
    document.querySelector("#workspace-single-menu").classList.add("hidden");
    document.querySelector("#workspace-single-menu-content").innerHTML = "";
    document.querySelector("#workspace-double-menu").classList.add("hidden");
    document.querySelector("#workspace-double-menu-content").innerHTML = "";
}

