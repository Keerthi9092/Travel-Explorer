export async function getCountry(countryName) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
  );
  if (!response.ok) throw new Error("Country information could not be loaded.");
  const data = await response.json();
  return data[0];
}

export async function getWeather(latitude, longitude) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather information could not be loaded.");
  return response.json();
}