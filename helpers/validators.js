export { isValidCompanyCode, isCompanyCode };

const LOWER_BOUND = 30000000;
const UPPER_BOUND = 60000000;

const MODULUS_BASE = 11;
const DIGIT_RANGE = 10;

const COMPANY_CODE_LENGTH = 8;
const CODE_PATTERN = new RegExp(`^[0-9]{${COMPANY_CODE_LENGTH}}$`);

const getRange = (code) =>
  parseInt(code, 10) < LOWER_BOUND || parseInt(code, 10) > UPPER_BOUND
    ? "A"
    : "B";

const calculateWeightedSum = (codeDigits) => (acc, weight, idx) =>
  acc + weight * codeDigits[idx];

const getChecksum = (codeDigits, weights) =>
  weights.split("").reduce(calculateWeightedSum(codeDigits), 0);

const isValidCompanyCode = (code) => {
  const [lastDigit, ...rest] = code.split("").reverse();

  const checkSumDigit = Number(lastDigit);
  const codeDigits = [...rest].reverse().map(Number);

  const range = getRange(code);

  const weights1 = range === "A" ? "1234567" : "7123456";
  const weights2 = range === "B" ? "3456789" : "9345678";

  const remainder = getChecksum(codeDigits, weights1) % MODULUS_BASE;

  const selectedWeights = remainder < DIGIT_RANGE ? weights1 : weights2;

  const checkSum = getChecksum(codeDigits, selectedWeights);

  const isValid = (checkSum % MODULUS_BASE) % DIGIT_RANGE === checkSumDigit;

  return isValid;
};

const isCompanyCode = (code) => {
  return CODE_PATTERN.test(code);
};
