import {Task} from "./Task";
import path from "path";
import process from "process";
import {Configuration} from "../Configuration";
import fs from "fs";

export class StructureTask extends Task {
    readonly name: string = 'Creating directories';

    async execute(): Promise<void> {
        const outPath: string = path.join(
            process.cwd(),
            Configuration.get('outDirectory')
        );

        if (!outPath.startsWith(process.cwd())) {
            throw "Trying to generate files outside of the repo scope. Too dangerous, cancelling";
        }

        if (fs.existsSync(outPath)) {
            console.info(`Removing directory ${outPath}`);

            fs.rmSync(outPath, {
                recursive: true,
                force: true
            })
        }

        fs.mkdirSync(outPath);

        const assetsPath: string = path.join(process.cwd(), 'assets');
        const outAssetsPath: string = path.join(outPath, 'assets');

        fs.cpSync(assetsPath, outAssetsPath, {
            recursive: true
        });

        Configuration.set('safeOutDirectory', outPath);

        console.info('All folders created');

        return Promise.resolve();
    }
}