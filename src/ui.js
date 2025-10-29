export function renderLoading(root) {
  root.textContent = "Loading...";
}
export function renderError(root, err) {
  root.textContent = `Error: ${err}`;
}
export function createRaport(root, { city, temperature, windspeed }) {
  root.innerHTML = `<h2>${city}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Wind: ${windspeed} km/h</p>`;
}
