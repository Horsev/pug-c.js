export { formatLastTime, getNumericDate, getDateNow };

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

const getDateNow = () => +new Date();

const roundDatetimeDown = (datetime, intervalInMinutes) => {
  const newDatetime = new Date(datetime.getTime());
  const minutes = newDatetime.getMinutes();
  const roundedMinutes =
    Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
  newDatetime.setMinutes(roundedMinutes);
  newDatetime.setSeconds(0);
  newDatetime.setMilliseconds(0);

  return newDatetime;
};

const updateIntervalInMin = 5;

const humanizeDatetime = (locale, options) => (datetime) =>
  datetime.toLocaleDateString(locale, options);

const localeDatetime = humanizeDatetime(LOCALE, datetimeOptions);
const localeDate = humanizeDatetime(LOCALE, dateOptions);

const formatLastTime = (date) => {
  const lastUpdate = roundDatetimeDown(new Date(date), updateIntervalInMin);
  const lastUpdateValue = localeDatetime(lastUpdate);

  return {
    dateTime: lastUpdate,
    dateTimeValue: lastUpdateValue,
  };
};

const getNumericDate = (date) => localeDate(new Date(date));
