(() => {
  const saveItem = (key) => (value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const readItem = (key) => (defaultValue) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const isMobileBanner = readItem("isMobileBanner")({
    isShow: true,
  });

  const { isShow } = isMobileBanner;
  const banner = document.querySelector("#odb-open-in-app");
  const closeButton = document.querySelector("button[aria-label=Close]");

  if (!isShow) {
    banner.classList.add("d-none");
  }

  const saveMobileBannerStatus = saveItem("isMobileBanner");

  const { Collapse } = window.bootstrap;
  const collapsed = new Collapse("#odb-open-in-app", {
    toggle: false,
  });

  closeButton.addEventListener("click", () => {
    collapsed.hide();
    saveMobileBannerStatus({ isShow: false });
  });
})();
