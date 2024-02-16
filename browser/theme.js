/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  const themes = {
    light: "#f8f9fa",
    dark: "#2b3035",
  };

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themes.dark);
      }
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themes[theme]);
      }
    }
  };

  setTheme(getPreferredTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-bs-theme-switch]").forEach((toggle) => {
      const switchTheme = () => {
        const theme = getPreferredTheme() === "dark" ? "light" : "dark";

        setStoredTheme(theme);
        setTheme(theme);
      };

      toggle.addEventListener("click", switchTheme);
    });
  });
})();
