import { UA_ALPHABET, COMPANY_CODE_LENGTH } from "../constants/index.js";

export {
  getFirstWord,
  normalizeQuotes,
  capitalizeWord,
  removeMultiSpaces,
  capitalizeString,
  padCodeWithLeadingZeros,
  replaceSeparator,
  removeNonDigits,
  addSpaceAfterComma,
  addSpaceAfterDot,
  addSpaceВeforeAfterBrackets,
  toLowerCase,
};

const toLowerCase = (str) => str.toLowerCase();

const addSpaceAfterComma = (str) => str.replace(/,([^ ])/g, ", $1");

const addSpaceAfterDot = (str) => str.replace(/\.([^ ])/g, ". $1");

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

const getFirstWord = (str = "") => {
  const [firstWord] = str.split(" ");
  return firstWord;
};

const normalizeQuotes = (text) => text.replace(/[«»“”]/gi, '"');

const capitalizeWord = ([firstLetter = "", ...rest]) =>
  firstLetter && firstLetter.toUpperCase() + rest.join("").toLowerCase();

const capitalizeString = (string) =>
  string.replace(UA_ALPHABET, capitalizeWord);

const padCodeWithLeadingZeros = (code, length = COMPANY_CODE_LENGTH) =>
  String(code).padStart(length, "0");
