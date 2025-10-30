export async function getCoords(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=10&language=pl`;
  const data = await dataFetch(url);
  console.log(data);
  const place = data.results?.[0];
  if (!place) throw new Error("Nie znaleziono miasta");
  const { name, latitude, longitude } = place;
  return { name, latitude, longitude };
}

export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const { current_weather } = await dataFetch(url);
  return current_weather;
}
async function dataFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Błąd sieci.");
  const data = await res.json();
  return data;
}
