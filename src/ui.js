import { wmo } from "./utils.js";

// -------------

export function renderLoading(root) {
  root.textContent = "Loading...";
}
export function renderError(root, msg) {
  root.innerHTML = `<p class="error">⚠️ ${msg}</p>`;
}

export function createRaport(
  root,
  { city, temperature, windspeed, weathercode, history = [] }
) {
  const info = wmo(weathercode);

  root.innerHTML = `
  <h2>${city}</h2>
  <p>${info.e} ${info.t} (code ${weathercode})</p>
  <p>🌡️ Temperature: ${temperature}°C</p>
  <p>💨 Wind: ${windspeed} km/h</p>
  <p>Historia: ${history.join(", ")}</p>
`;
}
