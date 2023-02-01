import {Generator} from "./Generator";
import * as process from "process";


const args: string[] = process.argv.slice(2);
const generator: Generator = Generator.create();
let generatePromise: Promise<void>;

if (args[0] === '--watch') {
    generatePromise = generator.watch()
        .then(() => console.log('Stopped watching.'));
} else {
    generatePromise = generator.generate()
        .then(() => console.log(`Done. Use "npm serve" to see your portfolio.`));
}

generatePromise
    .then(() => {
        process.exit(0);
    })
    .catch((e: string) => {
        console.error(e);
        process.exit(1);
    });