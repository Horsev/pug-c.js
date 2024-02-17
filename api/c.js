import uglifyJS from "uglify-js";
import { faIcon, noNewline } from "../helpers/filters.js";
import fullCompany from "../data/c.js";

const { APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const createCompanyPage = async (request, result) => {
  const { code } = request.params;

  const endpoint = endpointCompany(code);

  let templateData = {};

  const filters = {
    "uglify-js": (script) => uglifyJS.minify(script).code,
    "no-newline": noNewline,
    "fa-icon": faIcon,
  };

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Компанію з кодом ${code} не знайдено`);
    }

    const { data } = await response.json();

    templateData = {
      ...fullCompany(data),
      filters,
    };
  } catch ({ message }) {
    templateData = {
      error: true,
      message,
      filters,
    };
  } finally {
    const template = templateData.error ? "error.pug" : "c.pug";
    result.render(template, templateData);
  }
};

export default createCompanyPage;
