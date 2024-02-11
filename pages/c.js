// eslint-disable-next-line import/extensions
import fullCompany from "../data/c.js";

const { APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const createCPage = async (req, res) => {
  const { code } = req.params;

  const endpoint = endpointCompany(code);

  const response = await fetch(endpoint);
  const { data } = await response.json();

  res.render("c.pug", fullCompany(data));
};

export default createCPage;
