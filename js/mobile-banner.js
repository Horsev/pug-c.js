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

  if (!isShow) return;

  const saveMobileBannerStatus = saveItem("isMobileBanner");
  saveMobileBannerStatus({ isShow: true });

  const { Collapse } = window.bootstrap;
  const collapsed = new Collapse("#odb-open-in-app", {
    toggle: false,
  });

  const closeButton = document.querySelector("button[aria-label=Close]");
  closeButton.addEventListener("click", () => {
    collapsed.hide();
    saveMobileBannerStatus({ isShow: false });
  });

  collapsed.show();
})();
