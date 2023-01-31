import * as fs from "fs";
import * as process from "process";
import * as path from "path";

export class Configuration {
    protected static settings: Settings;

    public static get<P extends keyof Settings>(property: P): Settings[P] {
        Configuration.load();
        return Configuration.settings[property];
    }

    public static set<P extends keyof Settings>(property: P, value: Settings[P]): void  {
        Configuration.load();
        Configuration.settings[property] = value;
    }

    protected static getSettingsFilePath(): string {
        return path.join(
            process.cwd(),
            "etc/settings.json",
        );
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

    public static getPublicSettingsProperties(): Array<keyof Settings> {
        return [
            'title',
            'profile',
            'sections'
        ]
    }
}

export interface Settings {
    viewsDirectory: string;
    outDirectory: string;
    locales: string[];
    defaultLocale: string;
    title: string,
    profile: {
        name: string;
    },
    sections: string[],
    safeOutDirectory: string; // at runtime
}