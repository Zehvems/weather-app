import { getWeather } from "./api.js";
import { renderLoading, renderError, createRaport } from "./ui.js";
const root = document.getElementById("root");
const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  renderLoading(root);
  try {
    const weather = await getWeather();
    console.log("DATA:", weather);
    createRaport(root, weather);
  } catch (err) {
    renderError(root, err);
  }
});
