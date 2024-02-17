// eslint-disable-next-line import/prefer-default-export
export { formatLocalCurrency };

const { LOCALE, CURRENCY } = process.env;

const currencyOptions = (currency) => ({
  style: "currency",
  currency,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const getLocalCurrency = (locale, currency) =>
  new Intl.NumberFormat(locale, currencyOptions(currency));

const { format: localCurrency } = getLocalCurrency(LOCALE, CURRENCY);

const formatLocalCurrency = (amount) => localCurrency(amount);

// Refactor: convertToHumanCurrency › formatLocalCurrency();
