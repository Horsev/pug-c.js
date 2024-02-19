export {
  isCompanyCode,
  getFirstWord,
  normalizeQuotes,
  capitalizeWord,
  removeMultiSpaces,
  capitalizeString,
  padCodeWithLeadingZeros,
  replaceSeparator,
  removeNonDigits,
  addSpaceAfterDotAndComma,
  addSpaceВeforeAfterBrackets,
};

const addSpaceAfterDotAndComma = (str) =>
  str.replace(/,([^ ])/g, ", $1").replace(/\.([^ ])/g, ". $1");

const addSpaceВeforeAfterBrackets = (str) =>
  str.replace(/([^\s])(\()/g, "$1 $2").replace(/(\))([^\s])/g, "$1 $2");

const removeNonDigits = (str) => {
  const reNonDigits = /\D+/g;
  return str.replace(reNonDigits, "");
};

const joinSeparators = (separators) => (acc, val, index) =>
  acc + (val + (separators[index] || ""));

const replaceSeparator = (separator, separators) => (string) => {
  const splitedSttring = string.split(separator);

  return splitedSttring.length - 1 === separators.length
    ? splitedSttring.reduce(joinSeparators(separators), "").trim()
    : string;
};

const reMultiSpaces = /\s+/g;
const replaceRegex = (re, value) => (string) => string.replace(re, value);
const removeMultiSpaces = replaceRegex(reMultiSpaces, " ");

const companyCodeLength = 8;
const reCompanyCode = new RegExp(`^\\d{${companyCodeLength}}$`);

const isCompanyCode = (string) => reCompanyCode.test(string);

const getFirstWord = (str) => (str ? str.split(" ")[0] : "");

const normalizeQuotes = (text) => text.replace(/[«»“”]/gi, '"');

const uaAlphabet = "а-щьюя'ґєії";

const uaLetters = new RegExp(`[${uaAlphabet}]+`, "gi");

const capitalizeWord = ([firstLetter = "", ...rest]) =>
  firstLetter && firstLetter.toUpperCase() + rest.join("").toLowerCase();

const capitalizeString = (string) => string.replace(uaLetters, capitalizeWord);

const padCodeWithLeadingZeros = (code, length = companyCodeLength) =>
  String(code).padStart(length, "0");
