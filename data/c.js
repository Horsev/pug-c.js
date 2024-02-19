import { formatLocalCurrency } from "../helpers/numbers.js";

import {
  formatAdaptiveName,
  getShortForm,
  formatKvedClass,
  transformCompany,
  formatPagesSlider,
  formatActivities,
  formatPrimaryActivity,
  getUAPhoneNumber,
  formatWebPageDomain,
  formatLocation,
  getCompanyRegistry,
} from "../helpers/text.js";

import { addressCreator, regexKOATTY } from "../helpers/address.js";
import { formatUpdateTime } from "../helpers/date.js";

import { getFirstWord, padCodeWithLeadingZeros } from "../helpers/strings.js";

const botContent = "source_c-info_42011402";

const messengers = [
  {
    name: "Телеграм",
    src: "/img/logo-telegram.svg",
    url: `https://telegram.me/OpenDataUABot?start=${botContent}`,
  },

  {
    name: "Вайбер",
    src: "/img/logo-viber.svg",
    url: `viber://pa?chatURI=opendatabot&context=${botContent}`,
  },
];

const stores = [
  {
    src: "/img/appstore-apple.svg",
    href: "https://apps.apple.com/ua/app/опендатабот/id1463927156",
    width: "135",
    height: "40",
    alt: "Appstore",
  },
  {
    src: "/img/appstore-google.svg",
    href: "https://play.google.com/store/apps/details?id=ua.opendatabot&hl=uk",
    width: "135",
    height: "40",
    alt: "Google Play",
  },
];

const config = {
  messengers,
  stores,
};

const mapperFullCompany = (registry) => ({
  companyName: registry.shortName || registry.fullName,
  edrpou: registry.code,
  director: registry.ceoName,
  capital: formatLocalCurrency(registry.capital),
});

const faqMapper = ({ companyName, edrpou, capital }) => [
  {
    q: `Який ЄДРПОУ компанії ${companyName}?`,
    a: `Згідно з даними Єдиного державного реєстру юридичних осіб, фізичних осіб-підприємців та громадських формувань код ЄДРПОУ ${companyName} — ${edrpou}.`,
  },
  {
    q: `Який статутний капітал у ${companyName}?`,
    a: `Згідно з даними Єдиного державного реєстру юридичних осіб, фізичних осіб-підприємців та громадських формувань статутний капітал компанії ${companyName} складає ${capital}`,
  },
];

const companyRegistryConfig = [
  {
    companyName: ({ shortName, fullName }) =>
      formatAdaptiveName(shortName || getShortForm(fullName)),
  },
  { fullName: ({ fullName = "" }) => fullName },
  { ceoName: ({ ceoName = "" }) => ceoName },
  { code: ({ code }) => padCodeWithLeadingZeros(code) },
  {
    searchKved: ({ primaryActivity }) => getFirstWord(primaryActivity),
  },
  {
    kvedClass: ({ primaryActivity }) =>
      primaryActivity && formatKvedClass(primaryActivity.split(" ")),
  },
  {
    companyNameEng: ({ shortNameEn, fullNameEn }) => shortNameEn || fullNameEn,
  },
  {
    address: ({ address, location }) => ({
      addressValue: address && addressCreator(regexKOATTY(address)),
      addressString: location && formatLocation(location),
    }),
  },
  { email: ({ email }) => email.toLowerCase() },
  {
    phones: ({ phones }) => phones.map(getUAPhoneNumber).filter(Boolean),
  },
  {
    registrationDate: ({ registrationDate }) => registrationDate,
  },
  {
    capital: ({ capital }) => capital,
  },
  {
    updateTime: () => formatUpdateTime(new Date()),
  },
  {
    webPageDomain: ({ webPageDomain }) =>
      webPageDomain && [formatWebPageDomain(webPageDomain)],
  },
  {
    primaryActivity: ({ primaryActivity }) =>
      primaryActivity && [formatPrimaryActivity(primaryActivity)],
  },
  {
    activities: ({ activities }) => activities && formatActivities(activities),
  },
  {
    nextCompanies: ({ nextCompanies, nextCompany }) =>
      formatPagesSlider(nextCompanies || [nextCompany]),
  },
  {
    previousCompanies: ({ previousCompanies, previousCompany }) =>
      formatPagesSlider(previousCompanies || [previousCompany]),
  },
  {
    parentCompany: ({ parentCompany = "" }) =>
      parentCompany && transformCompany(parentCompany),
  },
];

const extractCompanyData = (registry, _config) => {
  const reduceRegistry = (acc, configItem) => {
    const [key] = Object.keys(configItem);
    const handler = configItem[key];
    const value = handler ? handler(registry) : registry[key];
    if (value) acc[key] = value;
    return acc;
  };

  return _config.reduce(reduceRegistry, {});
};

const registryConfig = [
  {
    key: "updateTime",
    value: "Час витягу з ЄДР",
    class: "col-12",
    type: "date",
  },
  {
    key: "fullName",
    value: "Повна назва",
    itemprop: "name",
    class: "col-12",
  },
  {
    key: "parentCompany",
    value: "Компанія, до якої належить філіал",
    class: "col-12",
  },
  {
    key: "companyNameEng",
    value: "Назва англійською мовою",
    class: "col-12",
  },
  {
    key: "address",
    value: "Адреса",
    class: "col-12",
    itemprop: "address",
  },
  {
    key: "email",
    value: "Пошта",
    class: "col-12 col-lg-4",
  },
  {
    key: "webPageDomain",
    value: "Вебсайт",
    class: "col-12 col-lg-4",
  },
  {
    key: "phones",
    value: "Телефон",
    class: "col-6 col-md-4",
    itemprop: "telephone",
  },
  {
    key: "registrationDate",
    value: "Дата заснування",
    class: "col-6 col-md-4",
    type: "date",
    itemprop: "foundingDate",
  },
  {
    key: "ceoName",
    value: "Директор",
    class: "col-6 col-md-4",
    itemprop: "employee",
  },
  {
    key: "code",
    value: "Код ЄДРПОУ",
    class: "col-6 col-md-4",
    itemprop: "taxID",
  },
  {
    key: "capital",
    value: "Статутний капітал",
    class: "col-6 col-md-4",
  },
  {
    key: "primaryActivity",
    value: "Основний вид діяльності",
    class: "col-12",
  },
  {
    key: "activities",
    value: "Інші види діяльності",
    class: "col-12",
  },
];

const fullCompany = ({ registry }) => {
  const data = extractCompanyData(registry, companyRegistryConfig);

  return {
    data,
    registryCell: getCompanyRegistry(data, registryConfig),
    config,
    faq: faqMapper(mapperFullCompany(registry)),
  };
};

export default fullCompany;
