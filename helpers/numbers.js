export { formatLocalCurrency, convertToHumanCurrency };

const { LOCALE, CURRENCY } = process.env;

const getCurrency = (locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

const localCurrency = getCurrency(LOCALE, CURRENCY);

const formatLocalCurrency = (amount) => localCurrency.format(amount);

// Refactor: replace to formatLocalCurrency();
const convertToHumanCurrency = (value, lang = LOCALE) => {
  const amount = new Intl.NumberFormat(lang, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value);

  return `${amount} грн`;
};
