export { toHryvnas, convertToHumanCurrency };

const convertToCurrency = (locale, currency) => (number) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(number);

const toHryvnas = convertToCurrency("uk-UA", "UAH");

const convertToHumanCurrency = (value, lang = "UK-ua") => {
  const parsedValue = parseInt(value);
  return Number.isNaN(parsedValue)
    ? null
    : `${parsedValue.toLocaleString(lang)}\xA0грн`;
};
