import {Task} from "./Task";
import path from "path";
import process from "process";
import {Configuration} from "../Configuration";
import fs from "fs";

export class FlagsTask extends Task {
    readonly name: string = 'Copying flags';

    async execute(): Promise<void> {
        const flagsPath: string = path.join(process.cwd(), 'node_modules', 'flag-icons', 'flags', '4x3');
        const outAssetsPath: string = path.join(Configuration.getOutPath(), 'assets');
        const locales: string[] = Configuration.get('locales');

        locales.forEach((locale: string) => {
            const flag: string = Configuration.get('flag', locale) ?? locale;
            const sourcePath: string = path.join(flagsPath, flag + '.svg');
            const destination: string = path.join(outAssetsPath, 'flag-' + flag + '.svg');

            if (!fs.existsSync(sourcePath)) {
                console.error(`Cannot find locale flag for ${flag} at ${sourcePath}`);
                return;
            }

            fs.cpSync(sourcePath, destination);
        });

        return Promise.resolve();
    }
}