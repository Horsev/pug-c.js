import {
  formatCompanyName,
  formatCompanyNameEn,
} from "../helpers/company-name.js";

import getAddress from "../helpers/address.js";

import { formatUpdateTime, getNumericDate } from "../helpers/date.js";
import getUAPhoneNumber from "../helpers/phones.js";
import { formatLocalCurrency } from "../helpers/numbers.js";

import { toLowerCase } from "../helpers/strings.js";
import { compose } from "../helpers/fp.js";

const getParentCompany = ({ code, name }) => ({
  link: `/c/${code}`,
  text: formatCompanyName(name),
});

const getEmail = (email) => ({
  link: `mailto:${toLowerCase(email)}`,
  text: toLowerCase(email),
});

const getWebPageDomain = (webPageDomain) => ({
  link: `https://${toLowerCase(webPageDomain)}`,
  text: toLowerCase(webPageDomain),
});

const getPhones = (phones) => {
  const formatedPhones = phones.map(getUAPhoneNumber).filter(Boolean);
  return formatedPhones.length ? formatedPhones : undefined;
};

const secondaryActivity = ({ isPrimary }) => !isPrimary;
const primaryActivity = ({ isPrimary }) => isPrimary;
const getActivityName = ({ name }) => `${name}`;
const getActivityLink = ({ name, code }) => ({
  link: `/kved/${code}`,
  text: `${code} ${name}`,
});
const separator = ", ";

const getSecondaryActivities = (activities) =>
  activities &&
  activities.filter(secondaryActivity).length && {
    text:
      activities
        .filter(secondaryActivity)
        .map(getActivityName)
        .join(separator) || undefined,
  };

const getPrimaryActivity = (activities) => {
  const [activityLink] = activities
    .filter(primaryActivity)
    .map(getActivityLink);

  return activityLink;
};

const companyRegistryMapper = ({
  fullName,
  shortName,
  parentCompany,
  fullNameEn,
  location,
  address,
  email,
  webPageDomain,
  phones,
  registrationDate,
  ceoName,
  code,
  capital,
  activities,
}) => [
  {
    name: "Час витягу з ЄДР",
    class: "col-12",
    value: formatUpdateTime(new Date()),
  },
  {
    name: "Повна назва",
    itemprop: "name",
    class: "col-12",
    value: { text: formatCompanyName(fullName || shortName) },
  },
  {
    name: "Компанія, до якої належить філіал",
    class: "col-12",
    value: parentCompany && getParentCompany(parentCompany),
  },
  {
    name: "Назва англійською мовою",
    class: "col-12",
    value: fullNameEn && { text: formatCompanyNameEn(fullNameEn) },
  },
  {
    key: "address",
    name: "Адреса",
    class: "col-12",
    itemprop: "address",
    value: {
      text: getAddress(address).addressText || location,
      html: getAddress(address).addressHTML || location,
    },
    unescaped: true,
  },
  {
    name: "Пошта",
    class: "col-12 col-lg-4",
    value: email && getEmail(email),
  },
  {
    name: "Вебсайт",
    class: "col-12 col-lg-4",
    value: webPageDomain && getWebPageDomain(webPageDomain),
  },
  {
    name: "Телефон",
    class: "col-6 col-md-4",
    itemprop: "telephone",
    values: phones && getPhones(phones),
  },
  {
    name: "Дата заснування",
    class: "col-6 col-md-4",
    itemprop: "foundingDate",
    value: registrationDate && {
      text: getNumericDate(registrationDate),
      datetime: registrationDate,
    },
  },
  {
    name: "Директор",
    class: "col-6 col-md-4",
    itemprop: "employee",
    value: ceoName && { text: ceoName },
  },
  {
    name: "Код ЄДРПОУ",
    class: "col-6 col-md-4",
    itemprop: "taxID",
    value: code && { text: code },
  },
  {
    name: "Статутний капітал",
    class: "col-6 col-md-4",
    value: capital && { text: formatLocalCurrency(capital), data: capital },
  },
  {
    name: "Основний вид діяльності",
    class: "col-12",
    value: activities && activities.length && getPrimaryActivity(activities),
  },
  {
    name: "Інші види діяльності",
    class: "col-12",
    value:
      activities && activities.length && getSecondaryActivities(activities),
    truncateId: "activities",
  },
];

const removeEmpty = ({ value, values }) => value || values;

const filterEmptyItems = (array) => array.filter(removeEmpty);

const getCompanyRegistry = compose(filterEmptyItems, companyRegistryMapper);

export default getCompanyRegistry;
