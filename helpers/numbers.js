export { formatLocalCurrency, formatLocalNumber };

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

const getLocalNumber = (locale) => (maximumSignificantDigits) =>
  new Intl.NumberFormat(locale, { maximumSignificantDigits });

const getNumberOfSignificantDigits = (
  number,
  percentOfSignificantDigits = 100,
) => {
  const percent100 = 100;
  const { floor } = Math;
  const { length } = number.toString();
  return floor(length * (percentOfSignificantDigits / percent100));
};

const localNumber = getLocalNumber(LOCALE);

const localNumberWithSignificantDigits = (number, percentOfSignificantDigits) =>
  localNumber(getNumberOfSignificantDigits(number, percentOfSignificantDigits));

const formatLocalNumber = (number, percentOfSignificantDigits = 100) =>
  localNumberWithSignificantDigits(number, percentOfSignificantDigits).format(
    number,
  );
