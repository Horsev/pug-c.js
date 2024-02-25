const seoData = ({ registry }) => ({
  title: `${registry.code} — ${registry.shortName || registry.fullName} — Опендатабот`,
  description: `Інформація про юридичну особу ${registry.shortName || registry.fullName} Реквізити ⚡ Код ЄДРПОУ ${registry.code} ⚡ ${registry.location} ⚡ Керівник ${registry.ceoName}`,
  keywords: `компанія, ${registry.shortName || registry.fullName}, реєстр, ЄДРПОУ`,
  canonical: `https://opendatabot.com/c/${registry.code}`,

  og: {
    title: `${registry.code} — ${registry.shortName || registry.fullName} — Опендатабот`,
    description: `Інформація про юридичну особу ${registry.shortName || registry.fullName} Реквізити ⚡ Код ЄДРПОУ ${registry.code} ⚡ ${registry.location} ⚡ Керівник ${registry.ceoName}`,
    image: `/i/odb_meta.png`,
    url: `https://opendatabot.com/c/${registry.code}`,
  },

  twitter: {
    title: `${registry.code} — ${registry.shortName || registry.fullName} — Опендатабот`,
    description: `Інформація про юридичну особу ${registry.shortName || registry.fullName} Реквізити ⚡ Код ЄДРПОУ ${registry.code} ⚡ ${registry.location} ⚡ Керівник ${registry.ceoName}`,
    image: `/i/odb_meta.png`,
    url: `https://opendatabot.com/c/${registry.code}`,
  },
});

export default seoData;
