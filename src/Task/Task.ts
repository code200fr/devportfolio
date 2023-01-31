export abstract class Task {
    readonly name: string = 'Unknown task';

    public abstract execute(): Promise<void>;
}