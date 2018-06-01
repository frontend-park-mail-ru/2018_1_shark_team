import LogInPage from "../../views/log-in-page/LogInPage";
import SignUpPage from "../../views/sign-up-page/SignUpPage";
import MainMenuPage from "../../views/main-menu-page/MainMenuPage";
import AboutAuthorsPage from "../../views/about-authors-page/AboutAuthorsPage";
import GameRulesPage from "../../views/game-rules-page/GameRulesPage";
import MyPage from "../../views/my-page/MyPage";
import LidersPage from "../../views/liders-page/LidersPage";
import OnePlayerPage from "../../views/one-player-page/OnePlayerPage";
import MultiplayerPage from "../../views/multiplayer-page/MultiplayerPage";


export default function initRouter(router) {
    const arr = [
        ["/main-menu", () => new MainMenuPage()],
        ["/log-in", () => new LogInPage()],
        ["/sign-up", () => new SignUpPage()],
        ["/about-authors", () => new AboutAuthorsPage()],
        ["/game-rules", () => new GameRulesPage()],
        ["/my-page", () => new MyPage()],
        ["/liders-page", () => new LidersPage()],
        ["/one-player-page", () => new OnePlayerPage()],
        ["/multiplayer-page", () => new MultiplayerPage()],
    ];

    arr.forEach((mass) => {
        const key = mass[0];
        const value = mass[1];
        router.addPage(key, value);
    });
}
