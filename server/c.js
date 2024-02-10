// eslint-disable-next-line import/extensions
import fullCompanyMapper from "../mappers/fullCompany.js";

const { APIKEY, API_DOMAIN, API_PATH } = process.env;

const endpointCompany = (code) =>
  `${API_DOMAIN}${API_PATH}/${code}?apiKey=${APIKEY}`;

const getData = (response) => response.json();

const mapData =
  (res, mapper) =>
  ({ data }) => {
    res.render("c.pug", mapper(data));
  };

const createCPage = async (req, res) => {
  const { code } = req.params;

  await fetch(endpointCompany(code))
    .then(getData)
    .then(mapData(res, fullCompanyMapper));
};

export default createCPage;
