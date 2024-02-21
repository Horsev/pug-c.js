import { formatCompanyName } from "../helpers/company-name.js";

const getCompanyShort = ({ fullName, shortName, code, ceoName }) => ({
  companyName: formatCompanyName(shortName || fullName),
  code,
  ceoName,
});

export default getCompanyShort;
