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
    lastShow: 0,
  });

  const { isShow } = isMobileBanner;

  if (!isShow) return;

  const saveMobileBannerStatus = saveItem("isMobileBanner");

  const { Collapse } = window.bootstrap;
  const collapsed = new Collapse("#odb-open-in-app", {
    toggle: false,
  });

  const closeButton = document.querySelector("button[aria-label=Close]");
  closeButton.addEventListener("click", () => {
    collapsed.hide();
    saveMobileBannerStatus({
      isShow: false,
      lastShow: Date.now(),
    });
  });

  collapsed.show();

  saveMobileBannerStatus({
    isShow: true,
    lastShow: Date.now(),
  });
})();
