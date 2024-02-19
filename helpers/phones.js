import { compose } from "./fp.js";
import { removeNonDigits } from "./strings.js";

// eslint-disable-next-line import/prefer-default-export
export { getUAPhoneNumber };

const parsePhoneNumber = (str) => {
  const rePrefixPattern = "^(?<prefix>380|0)";
  const reCodePattern = "(?<code>\\d{2})";
  const reNumberPattern = "(?<number>\\d{7})$";
  const re = new RegExp(`${rePrefixPattern}${reCodePattern}${reNumberPattern}`);
  return re.exec(str) && re.exec(str).groups;
};

const humanizePhoneNumber = ({ code, number }) => {
  const rePhoneNumber = /^(\d{3})(\d{2})(\d{2})$/;
  return `+380 (${code}) ${number.replace(rePhoneNumber, "$1-$2-$3")}`;
};

const formatPhone = compose(
  humanizePhoneNumber,
  parsePhoneNumber,
  removeNonDigits,
);

const formatNumberLink = compose(parsePhoneNumber, removeNonDigits);

const getUAPhoneNumber = (phone) => {
  if (!phone) return null;

  const { code = "", number = "" } = formatNumberLink(phone) || {};

  if (!code || !number) return null;

  return {
    value: formatPhone(phone),
    link: `tel:+380${code}${number}`,
  };
};
