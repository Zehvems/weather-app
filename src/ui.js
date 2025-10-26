const root = document.getElementById("root");
export function renderloading() {
  root.textContent = "Loading...";
}
export function renderError(err) {
  root.textContent = `Error: ${err}`;
}
export function createRaport(data) {
  root.innerHTML = `<h2>Poznań</h2><br>
                    <p>Temperature:${data.temp}°C</p>
                    <p>Wind:${data.wind}km/h</p> `;
}
