export {
  isCompanyCode,
  getFirstWord,
  normalizeQuotes,
  capitalizeWord,
  capitalizeString,
  padCodeWithLeadingZeros,
  validateCompanyCode,
};

const COMPANY_CODE_LENGTH = 8;

const reCompanyCode = new RegExp(`^\\d{${COMPANY_CODE_LENGTH}}$`);

const isCompanyCode = (string) => reCompanyCode.test(string);

const getFirstWord = (str) => (str ? str.split(" ")[0] : "");

const normalizeQuotes = (text) => text.replace(/[«»“”]/gi, '"');

const uaAlphabet = "а-щьюя'ґєії";

const uaLetters = new RegExp(`[${uaAlphabet}]+`, "gi");

const capitalizeWord = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join("").toLowerCase();

const capitalizeString = (string) => string.replace(uaLetters, capitalizeWord);

const padCodeWithLeadingZeros = (code, length = COMPANY_CODE_LENGTH) =>
  String(code).padStart(length, "0");

const validateCompanyCode = (companyCode) => {
  const CODE_RANGE_START = 30000000;
  const CODE_RANGE_END = 60000000;
  const BASE = 10;
  const MODULUS = 11;
  const FINAL_MODULUS = 10;
  const WEIGHTS_OUT_OF_RANGE = "1234567";
  const WEIGHTS_IN_RANGE = "7123456";
  const ALTERNATIVE_WEIGHTS_OUT_OF_RANGE = "3456789";
  const ALTERNATIVE_WEIGHTS_IN_RANGE = "9345678";
  const EXCLUDE_LAST_DIGIT = -1;

  const isCodeInRange = (code) => {
    const numericCode = parseInt(code, BASE);
    return numericCode >= CODE_RANGE_START && numericCode <= CODE_RANGE_END;
  };

  const weights1 = isCodeInRange(companyCode)
    ? WEIGHTS_IN_RANGE
    : WEIGHTS_OUT_OF_RANGE;
  const weights2 = isCodeInRange(companyCode)
    ? ALTERNATIVE_WEIGHTS_IN_RANGE
    : ALTERNATIVE_WEIGHTS_OUT_OF_RANGE;

  const getChecksum = (_companyCode, weights) => {
    const codeDigits = _companyCode
      .slice(0, EXCLUDE_LAST_DIGIT)
      .split("")
      .map(Number);
    const weightedSum = codeDigits.reduce(
      (sum, digit, idx) => sum + digit * parseInt(weights[idx], BASE),
      0,
    );
    return weightedSum;
  };

  const remainder = getChecksum(companyCode, weights1) % MODULUS;
  const weights = remainder < FINAL_MODULUS ? weights1 : weights2;
  const isValid =
    (getChecksum(companyCode, weights) % MODULUS) % FINAL_MODULUS ===
    Number(companyCode.slice(EXCLUDE_LAST_DIGIT));

  return isValid;
};
