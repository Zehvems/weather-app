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
  { city, temperature, windspeed, weathercode, history = [], region, country }
) {
  const info = wmo(weathercode);

  root.innerHTML = `
  <h2>${city}</h2>
  <p>${info.e} ${info.t} <span class="code">(${weathercode})</span></p>
  <p>🌡️ Temperatura: <strong>${temperature}°C</strong></p>
  <p>💨 Wiatr: ${windspeed} km/h</p>
  <p>📍 ${city}, ${region || "Brak danych"} (${country || "?"})</p>
  <hr />
  <p class="history">Historia wyszukiwań: ${
    history.length ? history.join(", ") : "—"
  }</p>
`;
}
