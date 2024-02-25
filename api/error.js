import { faIcon, noNewline, uglifyJS } from "../filters/index.js";

const createErrorPage = (message) => async (request, result) => {
  const templateData = {
    error: true,
    message,
    filters: {
      "uglify-js": uglifyJS,
      "no-newline": noNewline,
      "fa-icon": faIcon,
    },
  };

  const template = "error.pug";

  result.render(template, templateData);
};

export default createErrorPage;
