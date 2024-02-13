(() => {
  const params = new URLSearchParams(document.location.search);
  const query = params.get("odb-search");

  const searchInput = document.querySelector("input[name=odb-search]");

  const saveSuggestions = (suggestions) =>
    localStorage.setItem("suggestions", JSON.stringify(suggestions));

  const readSuggestions = () =>
    JSON.parse(localStorage.getItem("suggestions") || "[]");

  const suggestions = readSuggestions();
  const datalist = document.querySelector("datalist#suggestions");

  if (suggestions && datalist) {
    suggestions.forEach((suggestion) => {
      const option = document.createElement("option");
      option.value = suggestion.code;
      option.innerText = suggestion.description || "";

      datalist.appendChild(option);
    });
  }

  let code = "";
  let description = "";

  if (query) {
    try {
      code = searchInput.getAttribute("odb-code");
      description = searchInput.getAttribute("odb-description");
    } catch {
      // Do nothig
    } finally {
      if (query === code) {
        const newSuggestions = suggestions.filter(
          (suggestion) => suggestion.code !== code,
        );
        newSuggestions.unshift({ code, description });
        saveSuggestions(newSuggestions);
      }
    }
  }
})();
