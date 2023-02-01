# Code 200 Portfolio
A simple developer homepage, with i18n and a custom static build

## Commands
 * `npm run build`: compiles the generator. *You should only have to run this one once.*
 * `npm run generate`: generates your static website. *Run it each time you edit a config file, css file, template or script.*
 * `npm run serve`: starts a local server with your static website.

## Directory structure
 * `assets/`: css files, images
 * `etc/`: configuration & i18n json files
 * `scripts/`: frontend typescript files
 * `src/`: generator typescript source files ("backend")
 * `views/`: nunjucks views

The following directories will be created:
 * `build/`: generator javascript compiled code
 * **`generated/`: the static website, ready**
 * `node_modules/`: you know that one