import { getWeather, getCoords } from "./api.js";
import { renderLoading, renderError, createRaport } from "./ui.js";

// ===== theme system (AI-assisted) =====
const THEME_CLASSES = [
  "theme-clear-day",
  "theme-clear-night",
  "theme-cloudy-day",
  "theme-cloudy-night",
  "theme-rain-day",
  "theme-rain-night",
  "theme-snow-day",
  "theme-snow-night",
  "theme-storm-day",
  "theme-storm-night",
];

function getThemeClass(code, isDay) {
  const mode = isDay === 1 ? "day" : "night";
  let group;

  if ([0, 1].includes(code)) group = "clear";
  else if ([2, 3, 45, 48].includes(code)) group = "cloudy";
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    group = "rain";
  else if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    group = "snow";
  else if (code >= 95) group = "storm";
  else group = "cloudy";

  return `theme-${group}-${mode}`;
}

function applyTheme(weather) {
  const themeClass = getThemeClass(weather.weathercode, weather.is_day);
  THEME_CLASSES.forEach((c) => document.body.classList.remove(c));
  document.body.classList.add(themeClass);
}

// ===== DOM refs =====
const root = document.getElementById("root");
const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const langSelect = document.getElementById("langSelect");

// ===== język (localStorage) =====
let langValue = JSON.parse(localStorage.getItem("ln")) ?? "pl";
langSelect.value = langValue;

langSelect.addEventListener("change", () => {
  langValue = langSelect.value;
  localStorage.setItem("ln", JSON.stringify(langValue));
});

// ===== wyszukiwanie pogody =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  root.innerHTML = "";

  const city = cityInput.value.trim();
  if (city === "") {
    renderError(root, "Podaj miasto");
    cityInput.placeholder = "City...";
    return;
  }

  cityInput.value = "";
  cityInput.placeholder = city;

  root.classList.add("loading");
  renderLoading(root);

  try {
    const { name, latitude, longitude, region, country } = await getCoords(
      city,
      langValue
    );

    const weather = await getWeather(latitude, longitude);
    applyTheme(weather);

    const history = JSON.parse(localStorage.getItem("history")) ?? [];

    createRaport(root, {
      city: name,
      ...weather,
      history,
      region,
      country,
    });

    if (!history.includes(city)) {
      history.push(city);
      if (history.length > 5) history.shift();
      localStorage.setItem("history", JSON.stringify(history));
    }
  } catch (err) {
    renderError(root, err.message);
  } finally {
    root.classList.remove("loading");
  }
});
