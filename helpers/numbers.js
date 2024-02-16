export { toHryvnas, convertToHumanCurrency };

const { LOCALE, CURRENCY } = process.env;

const convertToCurrency = (locale, currency) => (number) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(number);

const toHryvnas = convertToCurrency(LOCALE, CURRENCY);

const convertToHumanCurrency = (value, lang = LOCALE) => {
  const amount = new Intl.NumberFormat(lang, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value);

  return `${amount} грн`;
};
