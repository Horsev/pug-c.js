const reCompanyCode = /^\d{8}$/;

const isCompanyCode = (string) => reCompanyCode.test(string);

export default isCompanyCode;
