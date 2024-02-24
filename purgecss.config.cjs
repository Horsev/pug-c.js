module.exports = {
  content: ["./**/*.pug"],
  // defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  safelist: [/^data-bs-/],
};
