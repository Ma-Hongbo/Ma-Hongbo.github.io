(function () {
  const STORAGE_KEY = "mhb_color_theme";
  const DEFAULT_THEME = "pink";

  const THEME_COLOR_MAP = {
    pink: "#fe667b",
    orange: "#f97316"
  };

  function setMetaThemeColor(color) {
    document
      .querySelectorAll('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach((meta) => meta.setAttribute("content", color));
  }

  function applyTheme(themeName) {
    const safeTheme = THEME_COLOR_MAP[themeName] ? themeName : DEFAULT_THEME;
    document.documentElement.setAttribute("data-color-theme", safeTheme);
    localStorage.setItem(STORAGE_KEY, safeTheme);
    setMetaThemeColor(THEME_COLOR_MAP[safeTheme]);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("theme-select");
    if (!select) return;

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const currentTheme = THEME_COLOR_MAP[savedTheme] ? savedTheme : DEFAULT_THEME;
    select.value = currentTheme;
    applyTheme(currentTheme);

    select.addEventListener("change", () => {
      applyTheme(select.value);
    });
  });
})();
