/* eslint-disable no-magic-numbers */
const UK_LOCALE = "uk-UA";

export const getNumericDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date)
    ? value
    : new Intl.DateTimeFormat(UK_LOCALE).format(date);
};

export const getDateNow = () => +new Date();

export const formatDateTime = (date) => {
  const dateTime = new Date(date);

  // Получаем компоненты даты
  const year = dateTime.getUTCFullYear();
  const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, "0"); // Месяцы начинаются с 0
  const day = dateTime.getUTCDate().toString().padStart(2, "0");

  // Получаем компоненты времени
  const hours = dateTime.getUTCHours().toString().padStart(2, "0");
  const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = dateTime
    .getUTCMilliseconds()
    .toString()
    .padStart(3, "0");

  // Форматируем дату и время
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  return `${formattedDate} ${formattedTime}`;
};

export const adjustAndFormatDateTime = (datetime) => {
  const updateDatetime = new Date(datetime);
  updateDatetime.setHours(updateDatetime.getHours() + 2);
  const minutes = updateDatetime.getMinutes();
  const floor = (power) => (mins) => Math.floor(mins / power) * power;
  const floor5 = floor(5);

  return new Date(updateDatetime.setMinutes(floor5(minutes)));
};

export const humanizedUpdateDatetime = (datetime) => {
  const updateDatetime = new Date(datetime);
  const adjustedDatetime = adjustAndFormatDateTime(updateDatetime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  return new Date(adjustedDatetime).toLocaleTimeString("uk-UA", options);
};

export const formatLastTime = (date) => {
  const dateTime = formatDateTime(adjustAndFormatDateTime(date));
  const dateTimeValue = humanizedUpdateDatetime(date);
  return {
    dateTime,
    dateTimeValue,
  };
};
