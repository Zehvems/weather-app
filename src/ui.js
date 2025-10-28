export function renderLoading(root) {
  root.classList.add("loading");
  root.textContent = "Loading...";
}
export function renderError(root, err) {
  root.textContent = `Error: ${err}`;
}
export function createRaport(root, data) {
  root.innerHTML = `<h2>Poznań</h2>
                    <p>Temperature:${data.temperature}°C</p>
                    <p>Wind:${data.windspeed}km/h</p> `;
}
