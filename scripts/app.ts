import {Splash} from "./Splash";
import {Contact} from "./Contact";

class App {
    public static start() {
        new Splash();
        new Contact();
    }
}

addEventListener('DOMContentLoaded', () => {
    App.start();
});