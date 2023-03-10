import * as fs from "fs";
import * as process from "process";
import * as path from "path";
import {Settings} from "./Settings";

export class Configuration {
    protected static readonly DefaultLocaleKey: string = 'default';
    protected static readonly SettingsDirectory: string = './etc';
    protected static readonly SettingsFilePath: string = 'settings.json';

    protected static settings: AllSettings;

    public static get<P extends keyof Settings>(property: P, locale?: string): Settings[P] {
        Configuration.load();
        const localeKey: string = Configuration.getLocaleKey(locale);

        return Configuration.settings[localeKey][property];
    }

    public static getOutPath(): string {
        return path.join(
            process.cwd(),
            './generated'
        );
    }

    public static getProperties(locale?: string): Array<keyof Settings> {
        Configuration.load();
        const localeKey: string = Configuration.getLocaleKey(locale);

        return Object.keys(Configuration.settings[localeKey]) as Array<keyof Settings>;
    }

    protected static getSettingsFilePath(locale?: string): string {
        const localeKey: string = Configuration.getLocaleKey(locale);

        let fileName: string;

        if (localeKey === Configuration.DefaultLocaleKey) {
            fileName = Configuration.SettingsFilePath;
        } else {
            fileName = localeKey.replace('.', '').replace(path.sep, '') + '.json';
        }

        return path.join(
            process.cwd(),
            Configuration.SettingsDirectory,
            fileName,
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

        Configuration.settings = {};

        const defaultSettings: Settings = Configuration.loadSettings();

        Configuration.settings[Configuration.DefaultLocaleKey] = defaultSettings;

        if (Array.isArray(defaultSettings.locales)) {
            for (const locale of defaultSettings.locales) {
                if (locale === defaultSettings.defaultLocale) {
                    continue;
                }

                const localeSettings: Partial<Settings> = Configuration.loadSettings(locale);

                Configuration.settings[locale] = Configuration.merge(
                    defaultSettings as unknown as MergeObject,
                    localeSettings as unknown as MergeObject,
                    true
                );
            }
        }
    }

    protected static loadSettings(locale?: string): Settings {
        console.log(this.getSettingsFilePath(locale));

        try {
            const rawSettings: string = fs.readFileSync(
                this.getSettingsFilePath(locale),
                'utf8'
            );

            return JSON.parse(rawSettings) as Settings;
        } catch (e) {
            throw "Unable to parse settings file";
        }
    }

    protected static isObject(item: unknown): boolean {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    protected static merge(target: MergeObject, source: MergeObject, isMergingArrays = false): Settings {
        if (!Configuration.isObject(target) || !Configuration.isObject(source)) {
            return source as unknown as Settings;
        }

        target = ((obj: MergeObject) => {
            return Object.assign({}, obj);
        })(target);

        Object.keys(source).forEach(key => {
            const targetValue = target[key];
            const sourceValue = source[key];

            if (Array.isArray(targetValue) && Array.isArray(sourceValue))
                if (isMergingArrays) {
                    target[key] = targetValue.map((x, i) => sourceValue.length <= i
                        ? x as MergeObject
                        : Configuration.merge(x as MergeObject, sourceValue[i] as MergeObject, isMergingArrays));

                    if (sourceValue.length > targetValue.length) {
                        target[key] = (target[key] as Array<unknown>).concat(sourceValue.slice(targetValue.length));
                    }
                } else {
                    target[key] = targetValue.concat(sourceValue);
                }
            else if (Configuration.isObject(targetValue) && Configuration.isObject(sourceValue))
                target[key] = Configuration.merge(Object.assign({}, targetValue), sourceValue as MergeObject, isMergingArrays);
            else
                target[key] = sourceValue;
        });

        return target as unknown as Settings;
    }

    protected static getLocaleKey(locale?: string): string {
        if (!locale) {
            return Configuration.DefaultLocaleKey;
        }

        if (locale === Configuration.get('defaultLocale')) {
            return Configuration.DefaultLocaleKey;
        }

        return locale;
    }
}

interface AllSettings {
    [locale: string]: Settings;
}

type MergeObject = {
    [property: string]: MergeObject|unknown;
}