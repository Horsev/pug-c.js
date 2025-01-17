export { formatUpdateTime, getNumericDate };

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

const roundDatetimeDown = (datetime, minutes) => {
  const minutesNow = datetime.getMinutes();
  const roundedMinutes = Math.floor(minutesNow / minutes) * minutes;
  datetime.setMinutes(roundedMinutes);
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);

  return datetime;
};

const humanizeDate = (locale, options) => (datetime) =>
  datetime.toLocaleDateString(locale, options);

const MINUTES_TO_ROUND = 5;

const formatUpdateTime = (date) => {
  const datetime = roundDatetimeDown(new Date(date), MINUTES_TO_ROUND);
  const text = humanizeDate(LOCALE, datetimeOptions)(datetime);

  return {
    datetime,
    text,
  };
};

const getNumericDate = (value) => {
  const date = new Date(value);
  return humanizeDate(LOCALE, dateOptions)(date);
};
