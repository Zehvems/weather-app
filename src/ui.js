import { wmo } from "./utils.js";

// -------------

export function renderLoading(root) {
  root.textContent = "Loading...";
}
export function renderError(root, err) {
  root.textContent = `Error: ${err}`;
}
export function createRaport(
  root,
  { city, temperature, windspeed, weathercode }
) {
  const info = wmo(weathercode);

  root.innerHTML = `
  <h2>${city}</h2>
  <p>${info.e} ${info.t} (code ${weathercode})</p>
  <p>🌡️ Temperature: ${temperature}°C</p>
  <p>💨 Wind: ${windspeed} km/h</p>
`;
}
