import uglifyJS from "uglify-js";
import markdownit from "markdown-it";

const createHelpPage = async (request, result) => {
  const templateData = {
    data: {
      edrpou: "",
      name: "",
    },
    filters: {
      "uglify-js": (script) => uglifyJS.minify(script).code,
      "markdown-it": (md) => markdownit().render(md),
      "no-newline": (html) => html.replace(/\n/g, " "),
    },
  };

  const template = "help.pug";

  result.render(template, templateData);
};

export default createHelpPage;
