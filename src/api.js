export async function getWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=52.41&longitude=16.93&current_weather=true";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Błąd sieci.");

  const { current_weather } = await res.json();
  return current_weather;
}
