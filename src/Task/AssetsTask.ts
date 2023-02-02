import {Task} from "./Task";
import path from "path";
import process from "process";
import {Configuration} from "../Configuration";
import fs from "fs";

export class AssetsTask extends Task {
    readonly name: string = 'Copying assets';
    readonly watchFiles: string[] = [
        "assets/"
    ];

    async execute(): Promise<void> {
        const assetsPath: string = path.join(process.cwd(), 'assets');
        const outAssetsPath: string = path.join(Configuration.getOutPath(), 'assets');

        return new Promise((resolve: () => void) => {
            setTimeout(() => {
                fs.cpSync(assetsPath, outAssetsPath, {
                    recursive: true
                });

                return resolve();
            }, 100); // Necessary slight delay
        })
    }
}