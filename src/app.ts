import {Generator} from "./Generator";
import * as process from "process";

Generator
    .create()
    .generate()
    .then(() => {
        console.log(`Done. Files are available here`);
        process.exit(0);
    })
    .catch((e: string) => {
        console.error(e);
        process.exit(1);
    });