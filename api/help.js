import { uglifyJS, noNewline, markdownIt } from "../helpers/filters.js";

const createHelpPage = async (request, result) => {
  const templateData = {
    data: {},
    filters: {
      "uglify-js": uglifyJS,
      "no-newline": noNewline,
      "markdown-it": markdownIt,
    },
  };

  const template = "help.pug";

  result.render(template, templateData);
};

export default createHelpPage;
