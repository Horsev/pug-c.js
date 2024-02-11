// eslint-disable-next-line import/extensions
import toHryvnas from "../helpers/data.js";

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

const mapper = (registry) => ({
  companyName: registry.shortName || registry.fullName,
  edrpou: registry.code,
  director: registry.ceoName,
  capital: toHryvnas(registry.capital),
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

const fullCompany = ({ registry }) => ({
  data: mapper(registry),
  config,
  faq: faqMapper(mapper(registry)),
});

export default fullCompany;
