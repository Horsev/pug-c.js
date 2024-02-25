(() => {
  const { saveItem, readItem } = window.__ODB__;

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

  const dontShowAgain = () => {
    saveMobileBannerStatus({ isShow: false, date: new Date() });
  };

  closeButton.addEventListener("click", dontShowAgain);
})();
