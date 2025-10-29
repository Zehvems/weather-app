import { getWeather, getCoords } from "./api.js";
import { renderLoading, renderError, createRaport } from "./ui.js";
const root = document.getElementById("root");
const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
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
    const { name, latitude, longitude } = await getCoords(city);
    const weather = await getWeather(latitude, longitude);
    console.log(name, latitude, longitude);
    console.log("DATA:", weather);
    createRaport(root, { city: name, ...weather });
  } catch (err) {
    renderError(root, err);
  } finally {
    root.classList.remove("loading");
  }
});
