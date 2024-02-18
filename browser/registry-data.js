(() => {
  const truncateElements = document.querySelectorAll(
    "[data-odb-truncate-target]",
  );

  const expandTruncated = (element, target) => (event) => {
    event.preventDefault();
    target.classList.remove("text-truncate");
    element.remove();
  };

  const isOverflown = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
  }) => scrollHeight > clientHeight || scrollWidth > clientWidth;

  const initExpandButton = (element) => {
    const { dataset } = element;
    const { odbTruncateTarget } = dataset;
    const target = document.querySelector(odbTruncateTarget);

    if (!isOverflown(target)) {
      element.remove();
      return;
    }

    element.addEventListener("click", expandTruncated(element, target));
  };

  truncateElements.forEach(initExpandButton);
})();
