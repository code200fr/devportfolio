import {Task} from "./Task/Task";
import {StructureTask} from "./Task/StructureTask";
import {HTMLTask} from "./Task/HTMLTask";


export class Generator {
    public static create(): Generator {
        return new Generator();
    }

    public async generate(): Promise<void> {
        const tasks: Array<{ new(): Task } & typeof Task> = [
            StructureTask,
            HTMLTask
        ];

        for (const taskClass of tasks) {
            const task: Task = new taskClass();
            console.log(task.name);
            await task.execute();
        }
    }
}