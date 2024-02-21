import { compose } from "../helpers/fp.js";
import { formatLocalCurrency } from "../helpers/numbers.js";
import { formatCompanyName } from "../helpers/company-name.js";

const getFAQData = (registry) => ({
  companyName: formatCompanyName(registry.shortName || registry.fullName),
  companyCode: registry.code,
  ceoName: registry.ceoName,
  capital: formatLocalCurrency(registry.capital),
});

const faqMapper = ({
  companyName,
  companyCode,
  capital,
  revenue,
  financialReportYear,
}) => [
  {
    q: `Який ЄДРПОУ компанії ${companyName}?`,
    a: `Згідно з даними Єдиного державного реєстру юридичних осіб, фізичних осіб-підприємців та громадських формувань код ЄДРПОУ ${companyName} — ${companyCode}.`,
    isValid: companyName && companyCode,
  },
  {
    q: `Який статутний капітал у ${companyName}?`,
    a: `Згідно з даними Єдиного державного реєстру юридичних осіб, фізичних осіб-підприємців та громадських формувань статутний капітал компанії ${companyName} складає ${capital}`,
    isValid: companyName && capital,
  },
  {
    q: `Яким був прибуток компанії ${companyName} у ${financialReportYear} році?`,
    a: `Чистий прибуток компанії ${companyName} склав ${revenue} у ${financialReportYear} році`,
    isValid: companyName && revenue && financialReportYear,
  },
];

const filterInvalid = ({ isValid }) => isValid;

const removeInvalid = (array) => array.filter(filterInvalid);

const getFaq = compose(removeInvalid, faqMapper, getFAQData);

export default getFaq;
