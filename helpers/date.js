export { localeDatetime, roundDatetimeDown, getNumericDate, getDateNow };

const { LOCALE } = process.env;

const datetimeOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const dateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const getDateNow = () => new Date();

const roundDatetimeDown = (datetime, intervalInMinutes) => {
  const minutes = datetime.getMinutes();
  const roundedMinutes =
    Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
  datetime.setMinutes(roundedMinutes);
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);

  return datetime;
};

const humanizeDatetime = (locale, options) => (datetime) =>
  new Intl.DateTimeFormat(locale, options).format(datetime);

const localeDatetime = humanizeDatetime(LOCALE, datetimeOptions);
const localeDate = humanizeDatetime(LOCALE, dateOptions);

const getNumericDate = (date) => localeDate(new Date(date));
