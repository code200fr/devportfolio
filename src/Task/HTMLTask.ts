import {Task} from "./Task";
import {TemplateEngine} from "../TemplateEngine";
import {Configuration} from "../Configuration";
import fs from "fs";
import path from "path";
import {minify} from "html-minifier";

export class HTMLTask extends Task {
    readonly name: string = 'Generating HTML files';
    readonly watchFiles: string[] = [
        'views/',
        'etc/'
    ];

    async execute(): Promise<void> {
        const engine: TemplateEngine = new TemplateEngine();
        const locales: string[] = Configuration.get('locales');
        const outPath: string = Configuration.getOutPath();

        for (const locale of locales) {
            const isDefaultLocale: boolean = locale === Configuration.get('defaultLocale');

            const html: string = engine.render('index.html.njk', {
                locale: locale,
                is_default_locale: isDefaultLocale
            });

            const minified: string = minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                collapseBooleanAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            });

            let fileName: string;

            if (isDefaultLocale) {
                fileName = path.join(outPath, 'index.html');
            } else {
                fileName = path.join(outPath, locale + '.html');
            }

            fs.writeFileSync(fileName, minified);
        }

        return Promise.resolve();
    }
}