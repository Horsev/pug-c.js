(() => {
  const truncateElements = document.querySelectorAll(
    "[data-odb-truncate-target]",
  );

  const isOverflow = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
  }) => scrollHeight > clientHeight || scrollWidth > clientWidth;

  truncateElements.forEach((element) => {
    const [truncatedElement] = element.children;
    truncatedElement.classList.add("text-truncate");

    if (!isOverflow(truncatedElement)) {
      truncatedElement.classList.remove("text-truncate");
      return;
    }

    const classList = [
      "link-body-emphasis",
      "link-offset-2",
      "link-underline-opacity-25",
      "link-underline-opacity-75-hover",
    ];

    const { dataset } = element;
    const { odbTruncateTarget } = dataset;

    truncatedElement.id = odbTruncateTarget;

    const expandLink = document.createElement("a");
    expandLink.classList.add(...classList);
    expandLink.textContent = "Розкрити";
    expandLink.href = "#";
    expandLink.id = "odbTruncateTarget";

    expandLink.addEventListener("click", (event) => {
      event.preventDefault();
      truncatedElement.classList.remove("text-truncate");
      expandLink.remove();
    });

    element.append(expandLink);
  });
})();
