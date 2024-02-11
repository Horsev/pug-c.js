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
    src: "https://opendatabot.ua/_nuxt/appstore.f34e9a2.svg",
    href: "https://apps.apple.com/ua/app/опендатабот/id1463927156",
    width: "135",
    height: "40",
    alt: "Appstore",
  },
  {
    src: "https://opendatabot.ua/_nuxt/googleplay.c83af8e.svg",
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
});

const fullCompany = ({ registry }) => ({
  data: mapper(registry),
  config,
});

export default fullCompany;
