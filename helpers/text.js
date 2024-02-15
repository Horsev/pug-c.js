/* eslint-disable no-magic-numbers */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import { processAddress } from "./address.js";

import { getNumericDate } from "./date.js";

const shortForm = {
  "товариство з обмеженою відповідальністю": "ТОВ",
  "фермерське господарство": "ФГ",
  "приватне акціонерне товариство": "ПРАТ",
  "публічне акціонерне товариство": "ПАТ",
  "акціонерне товариство": "АТ",
  "громадська організація": "ГО",
  "комунальне підприємство": "КП",
  "приватне підприємство": "ПП",
};

export const getShortForm = (name) => {
  if (!name) return "";

  const entry = Object.entries(shortForm).find(([key]) =>
    name.toLowerCase().includes(key.toLowerCase()),
  );

  return entry ? name.replace(new RegExp(entry[0], "i"), entry[1]) : name;
};

export const fixCityName = (name) => name.replace(/(м\.)(?!\s)/g, "$1 ");

const splitLongNames = (text) => {
  const addHyphenAfterMiddleVowel = (word) => {
    if (word.includes("-") || word.includes(" ")) return word;

    const getVowelPosition = (_word) => {
      const position = Math.ceil(_word.length / 2);

      const wordPartOne = _word.slice(0, position).split("").reverse().join("");
      const wordPartTwo = _word.slice(position).split("").join("");

      // eslint-disable-next-line prefer-regex-literals
      const reVowels = new RegExp(/[ОАИЕІУЯ]/);

      const vowelPositionOne = wordPartOne.search(reVowels);
      const vowelPositionTwo = wordPartTwo.search(reVowels);

      return vowelPositionOne < vowelPositionTwo
        ? wordPartOne.length - vowelPositionOne
        : wordPartOne.length + vowelPositionTwo + 1;
    };

    const vowelPosition = getVowelPosition(word);
    const shy = String.fromCharCode(0x00ad);

    return word.slice(0, vowelPosition) + shy + word.slice(vowelPosition);
  };

  const addSpaceAfterDotAndComma = (word) =>
    word.split(".").join(". ").split(",").join(", ");

  const addSpaceВeforeAfterBrackets = (word) =>
    word.split("(").join(" (").split(")").join(") ");

  return text
    .split(" ")
    .map((word) =>
      word.length > 15
        ? addHyphenAfterMiddleVowel(
            addSpaceAfterDotAndComma(addSpaceВeforeAfterBrackets(word)),
          )
        : word,
    )
    .join(" ")
    .trim();
};

const addSpaceToFirstAndLastQuote = (text) =>
  text
    .replace('"', ' "')
    .split("")
    .reverse()
    .join("")
    .replace('"', ' "')
    .split("")
    .reverse()
    .join("")
    .trim();

const solve3QuotesProblem = (text) =>
  text.split('"').length === 4
    ? text.replace('"', " «").replace('"', "„").replace('"', "“»").trim()
    : text;

const solve2QuotesProblem = (text) =>
  text.split('"').length === 3
    ? text.replace('"', " «").replace('"', "» ").trim()
    : text;

const removeMultiSpaces = (text) => {
  // eslint-disable-next-line prefer-regex-literals
  const reMultiSpaces = new RegExp(/\s\s+/g);
  return text.replace(reMultiSpaces, " ");
};

export function formatAdaptiveName(name) {
  try {
    return removeMultiSpaces(
      splitLongNames(
        solve2QuotesProblem(
          solve3QuotesProblem(addSpaceToFirstAndLastQuote(name)),
        ),
      ),
    );
  } catch (error) {
    return name;
  }
}

export const validateCompanyCode = (companyCode) => {
  const isCodeInRange = (code) =>
    parseInt(code, 10) < 30000000 || parseInt(code, 10) > 60000000;

  const weights1 = isCodeInRange(companyCode) ? "1234567" : "7123456";
  const weights2 = isCodeInRange(companyCode) ? "3456789" : "9345678";

  const getChecksum = (_companyCode, weights) => {
    const codeDigits = _companyCode.slice(0, -1).split("").map(Number);
    const weightedValues = weights
      .split("")
      .map((val, idx) => val * codeDigits[idx]);
    const checksum = weightedValues.reduce((acc, val) => acc + val, 0);

    return checksum;
  };

  const remainder = getChecksum(companyCode, weights1) % 11;

  const weights = remainder < 10 ? weights1 : weights2;

  const isValid =
    (getChecksum(companyCode, weights) % 11) % 10 ===
    Number(companyCode.slice(-1));

  return isValid;
};

const companyUrl = (code) => {
  const correctedCode = String(code).padStart(8, "0");
  return code && validateCompanyCode(code) && `/c/${correctedCode}`;
};

export const transformCompany = ({ name, code }) => ({
  value: formatAdaptiveName(name),
  link: companyUrl(code),
});

export const getFirstWord = (str) => (str ? str.split(" ")[0] : "");

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const formatKvedClass = ([, word, ...rest]) =>
  `${capitalize(word)} ${rest.join(" ").toLowerCase()}`;

export const formatPagesSlider = (pages) => {
  if (!pages || !pages.length) return [];

  const formatPages = (page) => ({
    code: page?.code,
    name: page?.shortName || page?.fullName || page?.name,
  });

  return pages.map(formatPages).filter(({ code, name }) => code && name);
};

export const formatActivities = (activities) => {
  const secondaryActivities = activities
    .filter(({ isPrimary }) => !isPrimary)
    .map(({ name }) => capitalize(name))
    .join(", ");

  return secondaryActivities.length > 150
    ? [{ value: secondaryActivities, truncate: true }]
    : secondaryActivities;
};

export const formatPrimaryActivity = (primaryActivity) => {
  if (!primaryActivity) return {};

  const [searchKved, word, ...rest] = primaryActivity.split(" ");

  const formattedName = `${searchKved} ${capitalize(word)} ${rest
    .join(" ")
    .toLowerCase()}`;

  return {
    value: formattedName,
  };
};

export const getPhoneNumber = (phone) => {
  if (!phone) return null;

  const removeNonDigits = (str) => {
    const reNonDigits = /\D+/g;
    return str.replace(reNonDigits, "");
  };

  const parsePhoneNumber = (str) => {
    const rePrefixPattern = "^(?<prefix>380|0)";
    const reCodePattern = "(?<code>\\d{2})";
    const reNumberPattern = "(?<number>\\d{7})$";
    const re = new RegExp(
      `${rePrefixPattern}${reCodePattern}${reNumberPattern}`,
    );
    return re.exec(str) && re.exec(str).groups;
  };

  const formatPhoneNumber = ({ code, number }) => {
    const rePhoneNumber = /^(\d{3})(\d{2})(\d{2})$/;
    return `+380 (${code}) ${number.replace(rePhoneNumber, "$1-$2-$3")}`;
  };

  const compose =
    (...fns) =>
    (...args) =>
      fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

  const formatPhone = compose(
    formatPhoneNumber,
    parsePhoneNumber,
    removeNonDigits,
  );
  const formatNumberLink = compose(parsePhoneNumber, removeNonDigits);

  const { code = "", number = "" } = formatNumberLink(phone) || {};

  if (!code || !number) return null;

  return {
    value: formatPhone(phone),
    link: `tel:+380${code}${number}`,
  };
};

export const formatWebPageDomain = (domain) => {
  if (!domain) return {};

  const webPage = domain.toLowerCase();

  return {
    value: webPage,
    link: `http://${webPage}`,
    rel: "nofollow",
  };
};

export const formatLocation = (location) => {
  return Object.values(processAddress(location)).filter(Boolean).join(", ");
};

export function titleToLowerCase(title) {
  const capitalizeFirstLetter = ([firstLetter = "", ...rest]) =>
    [firstLetter.toUpperCase(), ...rest.join("").toLowerCase()].join("");

  const [ОПФГ, ...name] = title.split('"');

  return capitalizeFirstLetter(ОПФГ) + ["", ...name].join('"') || title;
}

export const getCurrency = (value) => {
  const parsedValue = parseInt(value, 10);
  return Number.isNaN(parsedValue)
    ? null
    : `${parsedValue.toLocaleString("UK-ua")}\xA0грн`;
};

const normalizeQuotes = (text) => text.replace(/[«»“”]/gi, '"');

const getSubtitleRegistry = (cell) => {
  if (!cell.subtitle) return null;

  if (Array.isArray(cell.subtitle) && !cell.subtitle.length) return null;

  let subtitle = "";

  switch (cell.key) {
    case "fullName":
      subtitle = formatAdaptiveName(
        titleToLowerCase(normalizeQuotes(cell.subtitle)),
      );
      break;
    case "address":
      if (cell.subtitle.addressValue.creator) {
        subtitle = {
          preLink: cell.subtitle.addressValue.preLink,
          txtLink: cell.subtitle.addressValue.linkElement.text,
          link: cell.subtitle.addressValue.linkElement.link,
          boldText: cell.subtitle.addressValue.boldText,
          houseType: cell.subtitle.addressValue.houseType,
          houseNumber: cell.subtitle.addressValue.houseNumber,
          houseLetter: cell.subtitle.addressValue.houseLetter,
          afterAll: cell.subtitle.addressValue.afterAll,
        };
      } else {
        subtitle = cell.subtitle.addressString;
      }
      break;
    case "capital":
      subtitle = {
        dataValue: cell.subtitle,
        currencyToString: getCurrency(cell.subtitle),
      };
      break;
    case "registrationDate":
      subtitle = {
        dateTime: cell.subtitle,
        dateTimeValue: getNumericDate(cell.subtitle),
      };
      break;
    default:
      subtitle = cell.subtitle;
  }

  return subtitle;
};

export const getCompanyRegistry = (registry, config) => {
  const formatRegistry = (el) => ({
    ...el,
    subtitle: getSubtitleRegistry({
      subtitle: registry[el.key],
      key: el.key,
    }),
  });

  return config.map(formatRegistry).filter(({ subtitle }) => subtitle);
};
