import getFaq from "./faq.js";
import getCompanyShort from "./company-short.js";
import getCompanyRegistry from "./company-registry.js";

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

const getPageData = ({ registry }) => ({
  config: {
    messengers,
    stores,
  },
  companyShortData: getCompanyShort(registry),
  registryData: getCompanyRegistry(registry),
  faq: getFaq(registry),
});

export default getPageData;
