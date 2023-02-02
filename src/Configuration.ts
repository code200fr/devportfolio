import * as fs from "fs";
import * as process from "process";
import * as path from "path";
import {Settings} from "./Settings";

export class Configuration {
    protected static readonly SettingsFilePath: string = './etc/settings.json';
    protected static settings: Settings;

    public static get<P extends keyof Settings>(property: P): Settings[P] {
        Configuration.load();
        return Configuration.settings[property];
    }

    public static getOutPath(): string {
        return path.join(
            process.cwd(),
            Configuration.get('outDirectory')
        );
    }

    public static getProperties(): Array<keyof Settings> {
        Configuration.load();
        return Object.keys(Configuration.settings) as Array<keyof Settings>;
    }

    protected static getSettingsFilePath(): string {
        return path.join(
            process.cwd(),
            Configuration.SettingsFilePath,
        );
    }

    public static reload(): void {
        delete Configuration.settings;
        Configuration.load();
    }

    protected static load(): void {
        if (Configuration.settings !== undefined) {
            return;
        }

        try {
            const rawSettings: string = fs.readFileSync(
                this.getSettingsFilePath(),
                'utf8'
            );

            Configuration.settings = JSON.parse(rawSettings) as Settings;
        } catch (e) {
            throw "Unable to parse settings file";
        }
    }
}
