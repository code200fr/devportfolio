import {Task} from "./Task";
import process from "process";
import {Configuration} from "../Configuration";
import fs from "fs";

export class StructureTask extends Task {
    readonly name: string = 'Creating directories';

    async execute(): Promise<void> {
        const outPath: string = Configuration.getOutPath();

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

        console.info('All folders created');

        return Promise.resolve();
    }
}