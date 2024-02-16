export { toHryvnas };

const convertToCurrency = (locale, currency) => (number) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(number);

const toHryvnas = convertToCurrency("uk-UA", "UAH");
