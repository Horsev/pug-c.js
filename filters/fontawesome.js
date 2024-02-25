import { replaceRegex } from "../helpers/strings.js";

import { compose } from "../helpers/fp.js";

const reHTMLComments = /<!--[\s\S]*?-->/g;
const reMultiSpace = /\s+/g;

const addAttributeFillToPathTag = (pathFill) =>
  replaceRegex(/<path([^>]+)(\/)>/, `<path$1 fill="${pathFill}" />`);

const removeHTMLComments = replaceRegex(reHTMLComments, "");

const removeMultispaces = replaceRegex(reMultiSpace, " ");

const addClassesToSvg = (html, options) => {
  const addClass = `svg-inline--fa ${options.class ? ` ${options.class}` : ""}`;
  return html.replace(/<svg([^>]+)>/, `<svg$1 class="${addClass}">`);
};

const faIcon = compose(
  removeMultispaces,
  removeHTMLComments,
  addAttributeFillToPathTag("currentColor"),
  addClassesToSvg,
);

export default faIcon;
