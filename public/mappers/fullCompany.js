const fullCompany = ({ registry }) => ({
  companyName: registry.shortName || registry.fullName,
  edrpou: registry.code,
  director: registry.ceoName,
});

export default fullCompany;
