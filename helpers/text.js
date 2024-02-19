import { processAddress } from "./address.js";
import { getNumericDate } from "./date.js";
import { compose } from "./fp.js";

import { SHORT_ORGANIZATION_FORMS, UA_VOWELS } from "../constants/index.js";

import { getUAPhoneNumber } from "./phones.js";

import {
  normalizeQuotes,
  capitalizeWord,
  removeMultiSpaces,
  padCodeWithLeadingZeros,
  replaceSeparator,
  addSpaceAfterDotAndComma,
  addSpaceВeforeAfterBrackets,
} from "./strings.js";

import { isValidCompanyCode } from "./validators.js";

import { formatLocalCurrency } from "./numbers.js";

export {
  getShortForm,
  formatAdaptiveName,
  formatKvedClass,
  transformCompany,
  formatPagesSlider,
  formatActivities,
  formatPrimaryActivity,
  getUAPhoneNumber,
  formatWebPageDomain,
  formatLocation,
  getCompanyRegistry,
};

const LONG_NAME_THRESHOLD = 15;
const SOFT_HYPHEN = 0x00ad;
const WORD_HALF = 2;

const spaceSymbol = " ";
const emptyString = "";
const minusSymbol = "-";

const reUaVowels = new RegExp(`[${UA_VOWELS}]+`, "gi");

const getShortForm = (companyName) => {
  if (!companyName) return emptyString;

  const longFormFound = Object.keys(SHORT_ORGANIZATION_FORMS).find((longForm) =>
    companyName.toLowerCase().includes(longForm),
  );

  return longFormFound
    ? companyName.replace(
        new RegExp(longFormFound, "i"),
        SHORT_ORGANIZATION_FORMS[longFormFound],
      )
    : companyName;
};

const splitLongNames = (text) => {
  const findVowelPosition = (part, isReversed = false) => {
    const index = part.search(reUaVowels);
    return isReversed ? part.length - index : index + 1;
  };

  const splitWordAtMiddle = (_word) => {
    const position = Math.ceil(_word.length / WORD_HALF);
    return [_word.slice(0, position), _word.slice(position)];
  };

  const addHyphenAfterMiddleVowel = (word) => {
    if (word.includes(minusSymbol) || word.includes(spaceSymbol)) return word;

    const [firstPart, secondPart] = splitWordAtMiddle(word);
    const reversedFirstPart = firstPart
      .split(emptyString)
      .reverse()
      .join(emptyString);

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

  const addHyphenAndSpaces = (word) =>
    compose(
      addHyphenAfterMiddleVowel,
      addSpaceAfterDotAndComma,
      addSpaceВeforeAfterBrackets,
    )(word);

  const addHyphenAndSapces = (word) =>
    word.length > LONG_NAME_THRESHOLD ? addHyphenAndSpaces(word) : word;

  return text
    .split(spaceSymbol)
    .map(addHyphenAndSapces)
    .join(spaceSymbol)
    .trim();
};

const addSpaceToFirstAndLastQuote = (str) =>
  str.replace(/^([^"]*)"/, '$1 "').replace(/"([^"]*$)/, '" $1');

const solve2QuotesProblem = replaceSeparator('"', [" «", "» "]);
const solve3QuotesProblem = replaceSeparator('"', [" «", "„", "“»"]);
const solve4QuotesProblem = replaceSeparator('"', [" «", "» ", " «", "» "]);

const getFormatedCompanyName = compose(
  removeMultiSpaces,
  splitLongNames,
  solve2QuotesProblem,
  solve3QuotesProblem,
  solve4QuotesProblem,
  addSpaceToFirstAndLastQuote,
);

const formatAdaptiveName = (companyName) =>
  getFormatedCompanyName(companyName) || companyName;

const companyUrl = (code) => {
  const correctedCode = padCodeWithLeadingZeros(code);
  return code && isValidCompanyCode(code) && `/c/${correctedCode}`;
};

const transformCompany = ({ name, code }) => ({
  value: formatAdaptiveName(name),
  link: companyUrl(code),
});

const formatKvedClass = ([, word, ...rest]) =>
  `${capitalizeWord(word)} ${rest.join(spaceSymbol).toLowerCase()}`;

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

  const [searchKved, word, ...rest] = primaryActivity.split(spaceSymbol);

  const formattedName = `${searchKved} ${capitalizeWord(word)} ${rest
    .join(spaceSymbol)
    .toLowerCase()}`;

  return {
    value: formattedName,
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
  return (
    [capitalizeWord(ОПФГ)].join(emptyString) +
      [emptyString, ...name].join('"') || title
  );
};

const getSubtitleRegistry = (cell) => {
  if (!cell.subtitle) return null;

  if (Array.isArray(cell.subtitle) && !cell.subtitle.length) return null;

  let subtitle = emptyString;

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
        currencyToString: formatLocalCurrency(cell.subtitle),
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
