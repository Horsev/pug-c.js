(() => {
  const searchForms = document.querySelectorAll("form.odb-search-by-code");

  const onSubmit = (event) => {
    const { target } = event;
    const formData = new FormData(target);
    const query = formData.get("odb-search");

    const COMPANY_CODE_LENGTH = 8;
    const reCompanyCode = new RegExp(`^\\d{${COMPANY_CODE_LENGTH}}$`);

    if (!query || !reCompanyCode.test(query)) {
      if (query) {
        const shakeForm = new Promise((resolve) => {
          searchForms.forEach((form) => {
            form.classList.remove("shake");
            form.classList.add("shake");
          });

          const SHAKE_DELAY = 500;

          setTimeout(() => {
            resolve();
          }, SHAKE_DELAY);
        });

        const showHelpLink = () => {
          searchForms.forEach((form) => {
            form.classList.remove("shake");
            const { Collapse } = window.bootstrap;
            const helpLink = new Collapse("#helpLink", {
              toggle: false,
            });
            helpLink.show();
          });
        };

        shakeForm.then(showHelpLink);
      }

      event.preventDefault();
      return;
    }

    target.setAttribute("action", `/c/${query}`);
  };

  searchForms.forEach((form) => form.addEventListener("submit", onSubmit));
})();
