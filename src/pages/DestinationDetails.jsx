import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { destinations } from "../data/destinations";
import { getCountry, getWeather } from "../api";
import InfoCard from "../components/InfoCard";

export default function DestinationDetails() {
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === id);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!destination) return;
    let cancelled = false;

    async function load() {
      try {
        setError("");
        const [countryData, weatherData] = await Promise.all([
          getCountry(destination.countryApiName),
          getWeather(destination.latitude, destination.longitude)
        ]);
        if (!cancelled) {
          setCountry(countryData);
          setWeather(weatherData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [destination]);

  if (!destination) {
    return (
      <div className="container py-5 text-center">
        <h2>Destination not found</h2>
        <Link to="/explore" className="btn btn-dark mt-3">Back to Explore</Link>
      </div>
    );
  }

  const toggleFavourite = () => {
    const current = JSON.parse(localStorage.getItem("travel-favourites") || "[]");
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    localStorage.setItem("travel-favourites", JSON.stringify(next));
  };

  const temp = weather?.current?.temperature_2m;
  const wind = weather?.current?.wind_speed_10m;
  const humidity = weather?.current?.relative_humidity_2m;

  return (
    <div className="container py-5">
      <Link to="/explore" className="text-decoration-none text-dark d-inline-flex align-items-center gap-2 mb-4">
        <i className="bi bi-arrow-left"></i> Back to Explore
      </Link>

      <div className="details-hero overflow-hidden rounded-4 shadow-sm mb-4">
        <img src={destination.image} alt={destination.name} />
        <div className="details-overlay">
          <div>
            <div className="small mb-2">{destination.emoji} {destination.country}</div>
            <h1 className="display-5 fw-bold mb-0">{destination.name}</h1>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="content-card p-4 p-lg-5">
            <span className="eyebrow text-dark">ABOUT THE DESTINATION</span>
            <h2 className="fw-bold mt-2">{destination.name}</h2>
            <p className="lead text-secondary">{destination.description}</p>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {destination.tags.map((tag) => <span className="badge rounded-pill text-bg-dark" key={tag}>{tag}</span>)}
            </div>

            <button className="btn btn-dark" onClick={toggleFavourite}>
              <i className="bi bi-heart me-2"></i>Add / remove favourite
            </button>

            <hr className="my-4" />
            <h4 className="fw-bold mb-3">Country information</h4>

            {country ? (
              <div className="row g-3">
                <div className="col-md-6"><InfoCard icon="bi-geo-alt" title="Capital" value={country.capital?.[0]} /></div>
                <div className="col-md-6"><InfoCard icon="bi-people" title="Population" value={country.population?.toLocaleString()} /></div>
                <div className="col-md-6"><InfoCard icon="bi-translate" title="Languages" value={country.languages ? Object.values(country.languages).join(", ") : "—"} /></div>
                <div className="col-md-6"><InfoCard icon="bi-currency-exchange" title="Currency" value={country.currencies ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol || ""})`).join(", ") : "—"} /></div>
              </div>
            ) : (
              <div className="text-secondary">Loading country information...</div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="content-card p-4 sticky-lg-top weather-card">
            <span className="eyebrow text-dark">LIVE DATA</span>
            <h4 className="fw-bold mt-2">Current weather</h4>

            {error ? (
              <div className="alert alert-warning mt-3">{error}</div>
            ) : weather ? (
              <>
                <div className="weather-temp">{Math.round(temp)}°C</div>
                <p className="text-secondary">Live data from Open-Meteo</p>
                <div className="row g-3 mt-2">
                  <div className="col-6"><InfoCard icon="bi-droplet" title="Humidity" value={`${humidity}%`} /></div>
                  <div className="col-6"><InfoCard icon="bi-wind" title="Wind" value={`${wind} km/h`} /></div>
                </div>
              </>
            ) : (
              <div className="text-secondary mt-3">Loading weather...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}