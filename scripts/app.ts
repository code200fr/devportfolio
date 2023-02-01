import {Splash} from "./Splash";

class App {
    public static start() {
        new Splash();
    }
}

addEventListener('DOMContentLoaded', () => {
    App.start();
});