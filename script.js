const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
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
