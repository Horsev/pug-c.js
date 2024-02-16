import uglifyJS from "uglify-js";
import fullCompany from "../data/c.js";

const { APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const createCompanyPage = async (request, result) => {
  const { code } = request.params;

  const endpoint = endpointCompany(code);

  let templateData = {};

  try {
    const response = await fetch(endpoint);
    const { data } = await response.json();
    templateData = {
      ...fullCompany(data),
      filters: {
        "uglify-js": (script) => uglifyJS.minify(script).code,
      },
    };
  } catch {
    templateData = {
      error: true,
      message: "Сервіс тимчасово недоступний",
    };
  } finally {
    const template = templateData.error ? "error.pug" : "c.pug";
    result.render(template, templateData);
  }
};

export default createCompanyPage;
