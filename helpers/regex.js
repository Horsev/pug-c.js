import { COMPANY_CODE_LENGTH } from "../constants/index.js";

export { r, reCompanyCode };

const r = (re, flags = "u") =>
  new RegExp(
    re
      .replace(/#[^\n]*/gm, "")
      .replace(/\\#/gm, "#")
      .replace(/\s/gm, ""),
    flags,
  );

const getReCompanyCode = (companyCodeLength) =>
  r(`^\\d{${companyCodeLength}}$`);

const reCompanyCode = getReCompanyCode(COMPANY_CODE_LENGTH);
