// eslint-disable-next-line import/extensions
import fullCompany from "../data/c.js";

const { APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const createCompanyPage = async (request, result) => {
  const { code } = request.params;

  const endpoint = endpointCompany(code);

  const response = await fetch(endpoint);
  const { data } = await response.json();

  result.render("c.pug", fullCompany(data));
};

export default createCompanyPage;
