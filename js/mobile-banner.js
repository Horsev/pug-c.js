(() => {
  // eslint-disable-next-line no-underscore-dangle
  const { saveItem, readItem } = window.ODB;

  const isMobileBanner = readItem("isMobileBanner")({
    isShow: true,
  });

  const saveMobileBannerStatus = saveItem("isMobileBanner");

  const { isShow } = isMobileBanner;
  const banner = document.querySelector("#odb-open-in-app");
  const closeButton = document.querySelector("button[aria-label=Close]");

  if (!isShow) {
    banner.classList.add("d-none");
  }

  const { Collapse } = window.bootstrap;
  const collapsed = new Collapse("#odb-open-in-app", {
    toggle: false,
  });

  const closeBannerAndSaveStatus = () => {
    collapsed.hide();
    saveMobileBannerStatus({ isShow: false, date: new Date() });
  };

  closeButton.addEventListener("click", closeBannerAndSaveStatus);
})();
