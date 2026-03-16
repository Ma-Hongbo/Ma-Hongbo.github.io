(function () {
  const STORAGE_KEY = "mhb_color_theme";
  const DEFAULT_THEME = "orange";

  const THEME_COLOR_MAP = {
    orange: "#f97316",
    amber: "#f59e0b",
    copper: "#ea580c",
    tangerine: "#fb923c",
    sunset: "#f97316",
    "slot-a": "#f97316",
    "slot-b": "#f97316",
    "slot-c": "#f97316"
  };

  function setMetaThemeColor(color) {
    document
      .querySelectorAll('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach((meta) => meta.setAttribute("content", color));
  }

  function applyTheme(themeName) {
    document.documentElement.setAttribute("data-color-theme", themeName);
    localStorage.setItem(STORAGE_KEY, themeName);
    setMetaThemeColor(THEME_COLOR_MAP[themeName] || THEME_COLOR_MAP[DEFAULT_THEME]);

    document.querySelectorAll(".theme-switcher__option").forEach((option) => {
      const active = option.dataset.theme === themeName;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-pressed", String(active));
    });
  }

  function closePanel(toggle, panel) {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.getElementById("theme-switcher");
    const toggle = document.getElementById("theme-switcher-toggle");
    const panel = document.getElementById("theme-switcher-panel");

    if (!switcher || !toggle || !panel) return;

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    applyTheme(savedTheme || DEFAULT_THEME);

    toggle.addEventListener("click", () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    panel.querySelectorAll(".theme-switcher__option").forEach((option) => {
      option.addEventListener("click", () => {
        applyTheme(option.dataset.theme || DEFAULT_THEME);
        closePanel(toggle, panel);
      });
    });

    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target)) {
        closePanel(toggle, panel);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closePanel(toggle, panel);
      }
    });
  });
})();
