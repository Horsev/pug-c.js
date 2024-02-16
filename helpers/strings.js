const COMPANY_CODE_LENGTH = 8;

const reCompanyCode = new RegExp(`^\\d{${COMPANY_CODE_LENGTH}}$`);

const isCompanyCode = (string) => reCompanyCode.test(string);

export default isCompanyCode;
