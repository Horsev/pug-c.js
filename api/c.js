import { faIcon, noNewline, uglifyJS } from "../filters/index.js";
import getPageData from "../data/c.js";
import seoData from "../data/seo.js";

const { APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const createCompanyPage = async (request, result) => {
  const { code } = request.params;

  const endpoint = endpointCompany(code);

  let templateData = {};

  const filters = {
    "uglify-js": uglifyJS,
    "no-newline": noNewline,
    "fa-icon": faIcon,
  };

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Компанію з кодом ${code} не знайдено`);
    }

    const { data } = await response.json();

    const pageData = getPageData(data);

    templateData = {
      ...pageData,
      filters,
      SEO: seoData(data),
    };
  } catch ({ message }) {
    templateData = {
      error: true,
      message: `Помилка: ${message}`,
      filters,
    };
  } finally {
    const template = templateData.error ? "error.pug" : "c.pug";
    result.render(template, templateData);
  }
};

export default createCompanyPage;
