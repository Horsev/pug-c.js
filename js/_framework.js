// eslint-disable-next-line no-underscore-dangle
window.__ODB__ = {};

(() => {
  const { assign } = Object;
  const { __ODB__ } = window;

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

  assign(__ODB__, config);
})();
