(() => {
  const searchForms = document.querySelectorAll("form.odb-search-by-code");

  const onSubmit = (event) => {
    const formData = new FormData(event.target);
    const query = formData.get("odb-search");

    const reCompanyCode = /^\d{8}$/;

    if (!query || !reCompanyCode.test(query)) {
      event.preventDefault();
      return;
    }

    // eslint-disable-next-line no-param-reassign
    event.target.action = `/c/${query}`;
  };

  searchForms.forEach((form) => form.addEventListener("submit", onSubmit));
})();
