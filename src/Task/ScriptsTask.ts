import {Task} from "./Task";
import * as child_process from "child_process";
import process from "process";
import {ExecException} from "child_process";

export class ScriptsTask extends Task {
    readonly name: string = 'Compiling scripts';
    readonly watchFiles: string[] = [
        'scripts/'
    ];

    async execute(): Promise<void> {
        return new Promise((resolve: () => void, reject: () => void) => {
            child_process.exec('npx webpack', {
                cwd: process.cwd()
            }, (error: ExecException, stdout: string, stderr: string) => {
                if (error) {
                    console.error(stderr);
                    return reject();
                }

                console.log(stdout);

                return resolve();
            })
        })
    }
}