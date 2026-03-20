const yearElement = document.getElementById("year");
const printButton = document.querySelector("[data-print-cv]");
const themeToggles = document.querySelectorAll("[data-theme-toggle]");
const themeStorageKey = "najsit-theme";

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const readStoredTheme = () => {
  try {
    return window.localStorage.getItem(themeStorageKey);
  } catch (_error) {
    return null;
  }
};

const writeStoredTheme = (theme) => {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch (_error) {
    // Ignore storage failures and still apply the theme for the current session.
  }
};

const updateThemeToggleLabels = (theme) => {
  const isLight = theme === "light";

  themeToggles.forEach((toggle) => {
    toggle.textContent = isLight ? "Dark mode" : "Light mode";
    toggle.setAttribute("aria-pressed", String(isLight));
  });
};

const storedTheme = readStoredTheme();
applyTheme(storedTheme === "light" ? "light" : "dark");
updateThemeToggleLabels(document.documentElement.getAttribute("data-theme"));

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

if (themeToggles.length > 0) {
  themeToggles.forEach((themeToggle) => {
    themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
    writeStoredTheme(nextTheme);
    updateThemeToggleLabels(nextTheme);
    });
  });
}

const isLocalhost = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";

if (isLocalhost) {
  let currentVersion = 0;

  const pollForChanges = async () => {
    try {
      const response = await fetch("/__reload__", { cache: "no-store" });
      const data = await response.json();

      if (!currentVersion) {
        currentVersion = data.version;
        return;
      }

      if (data.version > currentVersion) {
        window.location.reload();
      }
    } catch (_error) {
      // Ignore polling errors during local development.
    }
  };

  window.setInterval(pollForChanges, 1000);
  pollForChanges();
}
