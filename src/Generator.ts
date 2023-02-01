import {Task} from "./Task/Task";
import {StructureTask} from "./Task/StructureTask";
import {HTMLTask} from "./Task/HTMLTask";
import {ScriptsTask} from "./Task/ScriptsTask";
import path from "path";
import process from "process";
import {AssetsTask} from "./Task/AssetsTask";
import {FSWatcher, watch} from "chokidar";
import {Configuration} from "./Configuration";

export class Generator {
    public static create(): Generator {
        return new Generator();
    }

    public async watch(): Promise<void> {
        const tasks: Tasks = this.getTasks();

        await this.generate();

        for (const taskClass of tasks) {
            const task: Task = new taskClass();

            if (task.watchFiles.length === 0) {
                continue;
            }

            const watchPaths: string[] = task.watchFiles.map((watchFile: string) => {
                return path.join(process.cwd(), watchFile);
            });

            const run = () => {
                Configuration.reload();
                console.log(task.name);
                task.execute()
                    .then(() => console.log('[✓]'))
                    .catch((e) => console.error(e));
            };

            const watcher: FSWatcher = watch(watchPaths, {
                ignoreInitial: true
            });

            watcher.on('add', run);
            watcher.on('change', run);
        }

        console.log('Watching…');

        return new Promise((resolve: () => void) => {
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', () => resolve());
        });
    }

    public async generate(): Promise<void> {
        const tasks: Tasks = this.getTasks();

        for (const taskClass of tasks) {
            const task: Task = new taskClass();
            console.log(task.name);
            await task.execute();
        }
    }

    protected getTasks(): Tasks {
        return [
            StructureTask,
            AssetsTask,
            HTMLTask,
            ScriptsTask
        ];
    }
}

type Tasks = Array<{ new(): Task } & typeof Task>;