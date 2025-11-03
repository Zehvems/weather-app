import { getWeather, getCoords } from "./api.js";
import { renderLoading, renderError, createRaport } from "./ui.js";
const root = document.getElementById("root");
const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const submitBtn = document.querySelector("#searchForm button");
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
    const { name, latitude, longitude } = await getCoords(city);
    const weather = await getWeather(latitude, longitude);
    console.log(name, latitude, longitude);
    console.log("DATA:", weather);
    const history = JSON.parse(localStorage.getItem("history")) ?? [];
    localStorage.setItem("history", JSON.stringify(history));

    createRaport(root, { city: name, ...weather, history });
    if (!history.includes(city)) history.push(city);
    localStorage.setItem("history", JSON.stringify(history));
  } catch (err) {
    renderError(root, err.message);
  } finally {
    root.classList.remove("loading");
  }
});
