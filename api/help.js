import { markdownIt, noNewline, uglifyJS } from "../filters/index.js";

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
