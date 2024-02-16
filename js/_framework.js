window.ODB = {};

(() => {
  const { assign } = Object;
  const { ODB } = window;

  const config = {
    version: "0.0.1",
    saveItem: (key) => (value) =>
      localStorage.setItem(key, JSON.stringify(value)),
    readItem: (key) => (defaultValue) => {
      try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },
  };

  assign(ODB, config);
})();
