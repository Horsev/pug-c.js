import { minify } from "uglify-js";
import markdownit from "markdown-it";

import faIcon from "./fontawesome.js";

export { faIcon, noNewline, uglifyJS, markdownIt };

const noNewline = (html) => html.replace(/\n/g, " ");

const uglifyJS = (script) => minify(script).code;

const markdownIt = (md) => markdownit().render(md);
