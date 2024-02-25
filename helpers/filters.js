import { minify } from "uglify-js";
import markdownit from "markdown-it";

import { replaceRegex } from "./strings.js";

import { compose } from "./fp.js";

export { faIcon, noNewline, uglifyJS, markdownIt };

const reHTMLComments = /<!--[\s\S]*?-->/g;
const reMultiSpace = /\s+/g;

const addAttributeFillToPathTag = (pathFill) =>
  replaceRegex(/<path([^>]+)(\/)>/, `<path$1 fill="${pathFill}" />`);

const removeHTMLComments = replaceRegex(reHTMLComments, "");

const removeMultispaces = replaceRegex(reMultiSpace, " ");

const addClassesToSvgTag = (html, options) => {
  const addClass = `svg-inline--fa ${options.class ? ` ${options.class}` : ""}`;
  return html.replace(/<svg([^>]+)>/, `<svg$1 class="${addClass}">`);
};

const faIcon = compose(
  removeMultispaces,
  removeHTMLComments,
  addAttributeFillToPathTag("currentColor"),
  addClassesToSvgTag,
);

const noNewline = (html) => html.replace(/\n/g, " ");

const uglifyJS = (script) => minify(script).code;

const markdownIt = (md) => markdownit().render(md);
