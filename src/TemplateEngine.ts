import nunjucks, {Environment} from "nunjucks";
import * as path from "path";
import {Configuration} from "./Configuration";
import {Settings} from "./Settings";

export class TemplateEngine {
    protected env: Environment;

    constructor() {
        this.env = nunjucks.configure(this.getViewsDirectory(), {
            autoescape: true
        });

        Configuration.getProperties().forEach((property: keyof Settings) => {
            this.env.addGlobal(property, Configuration.get(property));
        });

        this.env.addGlobal('base64', this.base64.bind(this));
    }

    protected base64(data: string): string {
        return Buffer.from(data).toString('base64');
    }

    protected getViewsDirectory(): string {
        return path.join(process.cwd(), Configuration.get('viewsDirectory'));
    }

    public render(fileName: string, context?: TemplateContext): string {
        return this.env.render(fileName, context ?? {});
    }
}

export interface TemplateContext {
    [property: string]: unknown;
}