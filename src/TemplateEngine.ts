import nunjucks, {Environment} from "nunjucks";
import * as path from "path";
import {Configuration, Settings} from "./Configuration";

export class TemplateEngine {
    protected env: Environment;

    constructor() {
        this.env = nunjucks.configure(this.getViewsDirectory(), {
            autoescape: true
        });

        Configuration.getPublicSettingsProperties().forEach((property: keyof Settings) => {
            this.env.addGlobal(property, Configuration.get(property));
        });
    }

    protected getViewsDirectory(): string {
        return path.join(process.cwd(), Configuration.get('viewsDirectory'));
    }

    public render(fileName: string, context?: TemplateContext): string {
        if (!context) {
            context = {};
        }

        return this.env.render(fileName, context);
    }
}

export interface TemplateContext {
    [property: string]: unknown;
}