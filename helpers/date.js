const UK_LOCALE = "uk-UA";

export const getNumericDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date)
    ? value
    : new Intl.DateTimeFormat(UK_LOCALE).format(date);
};

export const getDateNow = () => +new Date();

export const formatDateTime = (date) => {
  const PAD_LENGTH = 2;
  const MILLISECONDS_PAD_LENGTH = 3;

  const dateTime = new Date(date);

  // Получаем компоненты даты
  const year = dateTime.getUTCFullYear();
  const month = (dateTime.getUTCMonth() + 1)
    .toString()
    .padStart(PAD_LENGTH, "0"); // Месяцы начинаются с 0
  const day = dateTime.getUTCDate().toString().padStart(PAD_LENGTH, "0");

  // Получаем компоненты времени
  const hours = dateTime.getUTCHours().toString().padStart(PAD_LENGTH, "0");
  const minutes = dateTime.getUTCMinutes().toString().padStart(PAD_LENGTH, "0");
  const seconds = dateTime.getUTCSeconds().toString().padStart(PAD_LENGTH, "0");
  const milliseconds = dateTime
    .getUTCMilliseconds()
    .toString()
    .padStart(MILLISECONDS_PAD_LENGTH, "0");

  // Форматируем дату и время
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  return `${formattedDate} ${formattedTime}`;
};

export const adjustAndFormatDateTime = (datetime) => {
  const HOUR_ADJUSTMENT = 2;
  const MINUTE_FLOOR_DIVISOR = 5;

  const updateDatetime = new Date(datetime);
  updateDatetime.setHours(updateDatetime.getHours() + HOUR_ADJUSTMENT);
  const minutes = updateDatetime.getMinutes();
  const floor = (power) => (mins) => Math.floor(mins / power) * power;
  const floor5 = floor(MINUTE_FLOOR_DIVISOR);

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
