import {Task} from "./Task";
import path from "path";
import process from "process";
import {Configuration} from "../Configuration";
import fs from "fs";

export class IconsTask extends Task {
    readonly name: string = 'Copying icons files';

    async execute(): Promise<void> {
        const sourcePath: string = path.join(
            process.cwd(),
            'node_modules', '@fortawesome', 'fontawesome-free',
        );
        const fontPath: string = path.join(Configuration.getOutPath(), 'assets', 'webfonts');

        if (!fs.existsSync(fontPath)) {
            fs.mkdirSync(fontPath);
        }

        type FileToCopy = { source: string, destination: string };

        const filesToCopy: FileToCopy[] = [
            { source: 'css/brands.css', destination: 'brands.css' },
            { source: 'webfonts/fa-brands-400.ttf', destination: 'fa-brands-400.ttf' },
            { source: 'webfonts/fa-brands-400.woff2', destination: 'fa-brands-400.woff2' },
        ];

        filesToCopy.forEach((file: FileToCopy) => {
            fs.cpSync(
                path.join(sourcePath, file.source),
                path.join(fontPath, file.destination)
            );
        })

        return Promise.resolve();
    }
}