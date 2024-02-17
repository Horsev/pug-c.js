export { faIcon, noNewline };

const setAtributes = (svgClass, pathFill) => (svgString) =>
  svgString
    .replace(/<svg([^>]+)>/, `<svg$1 class="${svgClass}">`)
    .replace(/<path([^>]+)>/, `<path$1 fill="${pathFill}">`);

const faIcon = setAtributes("svg-inline--fa", "currentColor");

const noNewline = (html) => html.replace(/\n/g, " ");
