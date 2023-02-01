export abstract class Task {
    readonly name: string = 'Unknown task';
    readonly watchFiles: string[] = [];

    public abstract execute(): Promise<void>;
}