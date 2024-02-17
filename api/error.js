import uglifyJS from "uglify-js";
import markdownit from "markdown-it";

const createErrorPage = (message) => async (request, result) => {
  const templateData = {
    error: true,
    message,
    filters: {
      "uglify-js": (script) => uglifyJS.minify(script).code,
      "markdown-it": (md) => markdownit().render(md),
      "no-newline": (html) => html.replace(/\n/g, " "),
    },
  };

  const template = "error.pug";

  result.render(template, templateData);
};

export default createErrorPage;
