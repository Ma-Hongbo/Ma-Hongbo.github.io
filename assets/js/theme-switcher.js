(function () {
  const STORAGE_KEY = "mhb_theme";
  const DEFAULT_THEME = "pink";
  const THEME_COLORS = {
    pink: "#fe667b",
    orange: "#f97316"
  };

  function setMetaThemeColor(theme) {
    const color = THEME_COLORS[theme] || THEME_COLORS[DEFAULT_THEME];
    document
      .querySelectorAll('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach((meta) => meta.setAttribute("content", color));
  }

  function applyTheme(theme) {
    const safeTheme = THEME_COLORS[theme] ? theme : DEFAULT_THEME;
    document.documentElement.setAttribute("data-color-theme", safeTheme);
    localStorage.setItem(STORAGE_KEY, safeTheme);
    setMetaThemeColor(safeTheme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("theme-select");
    if (!select) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    const current = THEME_COLORS[saved] ? saved : DEFAULT_THEME;
    select.value = current;
    applyTheme(current);

    select.addEventListener("change", function () {
      applyTheme(select.value);
    });
  });
})();
