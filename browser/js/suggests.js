(() => {
  const { saveItem, readItem } = window.__ODB__;

  const MAX_SUGGESTIONS = 100;

  const params = new URLSearchParams(document.location.search);
  const query = params.get("odb-search");

  const searchInput = document.querySelector("input[name=odb-search]");

  const saveSuggestions = saveItem("suggestions");
  const readSuggestions = readItem("suggestions");

  const suggestions = readSuggestions([]);

  const datalist = document.querySelector("datalist#suggestions");

  let newSuggestions = suggestions;

  const code = searchInput.getAttribute("data-odb-code");
  const description = searchInput.getAttribute("data-odb-description");

  if (query === code && code) {
    newSuggestions = suggestions.filter(
      (suggestion) => suggestion.code !== code,
    );
    newSuggestions.unshift({ code, description });
    newSuggestions = newSuggestions.slice(0, MAX_SUGGESTIONS);
    saveSuggestions(newSuggestions);
  }

  const renderOptions = (suggestion) => {
    const option = document.createElement("option");
    option.value = suggestion.code;
    option.innerText = suggestion.description || "";

    datalist.appendChild(option);
  };

  if (newSuggestions && datalist) {
    newSuggestions.forEach(renderOptions);
  }
})();
