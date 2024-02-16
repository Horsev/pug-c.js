import { processAddress } from "./address.js";
import { getNumericDate } from "./date.js";

import { shortForms } from "../constants/index.js";

import {
  normalizeQuotes,
  capitalizeWord,
  padCodeWithLeadingZeros,
  validateCompanyCode,
} from "./strings.js";

import { convertToHumanCurrency } from "./numbers.js";

export {
  getShortForm,
  formatAdaptiveName,
  formatKvedClass,
  transformCompany,
  formatPagesSlider,
  formatActivities,
  formatPrimaryActivity,
  getPhoneNumber,
  formatWebPageDomain,
  formatLocation,
  getCompanyRegistry,
  fixCityName,
};

const getShortForm = (name) => {
  if (!name) return "";

  const entry = Object.entries(shortForms).find(([key]) =>
    name.toLowerCase().includes(key.toLowerCase()),
  );

  return entry ? name.replace(new RegExp(entry[0], "i"), entry[1]) : name;
};

const fixCityName = (name) => name.replace(/(м\.)(?!\s)/g, "$1 ");

const LONG_NAME_THRESHOLD = 15;
const SOFT_HYPHEN = 0x00ad;
const VOWELS_REGEX = /[ОАИЕІУЯ]/;
const WORD_HALF = 2;

const splitLongNames = (text) => {
  const addHyphenAfterMiddleVowel = (word) => {
    if (word.includes("-") || word.includes(" ")) return word;

    const findVowelPosition = (part, isReversed = false) => {
      const index = part.search(VOWELS_REGEX);
      return isReversed ? part.length - index : index + 1;
    };

    const splitWordAtMiddle = (_word) => {
      const position = Math.ceil(_word.length / WORD_HALF);
      return [_word.slice(0, position), _word.slice(position)];
    };

    const [firstPart, secondPart] = splitWordAtMiddle(word);
    const reversedFirstPart = firstPart.split("").reverse().join("");

    const vowelPositionInFirstPart = findVowelPosition(reversedFirstPart, true);
    const vowelPositionInSecondPart = findVowelPosition(secondPart);

    const vowelPosition =
      vowelPositionInFirstPart < vowelPositionInSecondPart
        ? vowelPositionInFirstPart
        : vowelPositionInFirstPart + vowelPositionInSecondPart - 1;

    return (
      word.slice(0, vowelPosition) +
      String.fromCharCode(SOFT_HYPHEN) +
      word.slice(vowelPosition)
    );
  };

  const addSpaceAfterDotAndComma = (word) =>
    word.split(".").join(". ").split(",").join(", ");

  const addSpaceВeforeAfterBrackets = (word) =>
    word.split("(").join(" (").split(")").join(") ");

  return text
    .split(" ")
    .map((word) =>
      word.length > LONG_NAME_THRESHOLD
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

const QUOTES_FOR_3_QUOTES_PROBLEM = 4;
const QUOTES_FOR_2_QUOTES_PROBLEM = 3;

const solve3QuotesProblem = (text) =>
  text.split('"').length === QUOTES_FOR_3_QUOTES_PROBLEM
    ? text.replace('"', " «").replace('"', "„").replace('"', "“»").trim()
    : text;

const solve2QuotesProblem = (text) =>
  text.split('"').length === QUOTES_FOR_2_QUOTES_PROBLEM
    ? text.replace('"', " «").replace('"', "» ").trim()
    : text;

const removeMultiSpaces = (text) => {
  const reMultiSpaces = /\s\s+/g;
  return text.replace(reMultiSpaces, " ");
};

const formatAdaptiveName = (name) => {
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
};

const companyUrl = (code) => {
  const correctedCode = padCodeWithLeadingZeros(code);
  return code && validateCompanyCode(code) && `/c/${correctedCode}`;
};

const transformCompany = ({ name, code }) => ({
  value: formatAdaptiveName(name),
  link: companyUrl(code),
});

const formatKvedClass = ([, word, ...rest]) =>
  `${capitalizeWord(word)} ${rest.join(" ").toLowerCase()}`;

const formatPagesSlider = (pages) => {
  if (!pages || pages.length === 0) return [];

  const getValidPageName = (page) =>
    page.shortName || page.fullName || page.name;

  const transformPages = (acc, page) => {
    if (!page) return acc;

    const { code } = page;
    const name = getValidPageName(page);

    if (code && name) acc.push({ code, name });

    return acc;
  };

  return pages.reduce(transformPages, []);
};

const formatActivities = (activities) => {
  const MAX_LENGTH = 150;

  const secondaryActivities = activities
    .filter(({ isPrimary }) => !isPrimary)
    .map(({ name }) => capitalizeWord(name))
    .join(", ");

  return secondaryActivities.length > MAX_LENGTH
    ? [{ value: secondaryActivities, truncate: true }]
    : secondaryActivities;
};

const formatPrimaryActivity = (primaryActivity) => {
  if (!primaryActivity) return {};

  const [searchKved, word, ...rest] = primaryActivity.split(" ");

  const formattedName = `${searchKved} ${capitalizeWord(word)} ${rest
    .join(" ")
    .toLowerCase()}`;

  return {
    value: formattedName,
  };
};

const getPhoneNumber = (phone) => {
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

const formatWebPageDomain = (domain) => {
  if (!domain) return {};

  const webPage = domain.toLowerCase();

  return {
    value: webPage,
    link: `http://${webPage}`,
    rel: "nofollow",
  };
};

const formatLocation = (location) => {
  return Object.values(processAddress(location)).filter(Boolean).join(", ");
};

const titleToLowerCase = (title) => {
  const [ОПФГ, ...name] = title.split('"');
  return [capitalizeWord(ОПФГ)].join("") + ["", ...name].join('"') || title;
};

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
      } else subtitle = cell.subtitle.addressString;
      break;
    case "capital":
      subtitle = {
        dataValue: cell.subtitle,
        currencyToString: convertToHumanCurrency(cell.subtitle),
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

const getCompanyRegistry = (registry, config) => {
  const formatRegistry = (el) => ({
    ...el,
    subtitle: getSubtitleRegistry({
      subtitle: registry[el.key],
      key: el.key,
    }),
  });

  return config.map(formatRegistry).filter(({ subtitle }) => subtitle);
};
