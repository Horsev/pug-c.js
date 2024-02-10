const fullCompanyMapper = ({ registry }) => ({
  data: {
    companyName: registry.shortName || registry.fullName,
    edrpou: registry.code,
    director: registry.ceoName,
  },
});

export default fullCompanyMapper;
