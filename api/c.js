// eslint-disable-next-line import/extensions
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
    templateData = fullCompany(data);
  } catch {
    templateData = {
      error: true,
      message: "Backend unrechable",
    };
  } finally {
    const template = templateData.error ? "error.pug" : "c.pug";
    result.render(template, templateData);
  }
};

export default createCompanyPage;
