(() => {
  const params = new URLSearchParams(document.location.search);
  const query = params.get("odb-search");

  const searchInput = document.querySelector("input[name=odb-search]");

  const saveItem = (key) => (value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const readItem = (key) => () => JSON.parse(localStorage.getItem(key) || "[]");

  const saveSuggestions = saveItem("suggestions");
  const readSuggestions = readItem("suggestions");

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
      code = searchInput.getAttribute("data-odb-code");
      description = searchInput.getAttribute("data-odb-description");
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
