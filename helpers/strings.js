export {
  removeMultiSpaces,
  replaceSeparator,
  addSpaceAfterSymbol,
  addSpaceBeforeSymbol,
  splitString,
  toLowerCase,
  removeNonDigits,
  replaceRegex,
  capitalizeUAword,
  capitalizeUAstring,
};

const uaAlphabet = "а-щьюя'ґєії";
const uaLetters = new RegExp(`[${uaAlphabet}]+`, "gi");

const capitalizeUAword = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join("").toLowerCase();

const capitalizeUAstring = (string) =>
  string.replace(uaLetters, capitalizeUAword);

const splitString = (separator) => (string) => string.split(separator);

const toLowerCase = (str) => str.toLowerCase();

const joinSeparators = (separators) => (acc, val, index) =>
  acc + (val + (separators[index] || ""));

const replaceSeparator = (separator, separators) => (string) => {
  const splitedSttring = string.split(separator);

  return splitedSttring.length - 1 === separators.length
    ? splitedSttring.reduce(joinSeparators(separators), "").trim()
    : string;
};

const removeNonDigits = (str) => {
  const reNonDigits = /\D+/g;
  return str.replace(reNonDigits, "");
};

const reMultiSpaces = /\s+/g;

const replaceRegex = (re, value) => (string) => string.replace(re, value);

const removeMultiSpaces = replaceRegex(reMultiSpaces, " ");

const escapedSymbol = (symbol) =>
  symbol.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

const addSpaceAfterSymbol = (symbol) => (str) =>
  str.replace(
    new RegExp(`${escapedSymbol(symbol)}(?!\\s|$)`, "g"),
    `${symbol} `,
  );

const addSpaceBeforeSymbol = (symbol) => (str) =>
  str.replace(
    new RegExp(`(?<!^|\\s)${escapedSymbol(symbol)}`, "g"),
    ` ${symbol}`,
  );
