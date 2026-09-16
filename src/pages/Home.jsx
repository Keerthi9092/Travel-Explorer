import { Link } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";

export default function Home() {
  const [featured, ...rest] = destinations;
  const featuredDestinations = [featured, ...rest.slice(0, 3)];

  const toggleFavourite = (id) => {
    const current = JSON.parse(localStorage.getItem("travel-favourites") || "[]");
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    localStorage.setItem("travel-favourites", JSON.stringify(next));
    window.dispatchEvent(new Event("storage"));
  };

  const isFavourite = (id) =>
    JSON.parse(localStorage.getItem("travel-favourites") || "[]").includes(id);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <span className="eyebrow">PLAN • DISCOVER • EXPLORE</span>
          <h1>Find your next<br /><span>great escape.</span></h1>
          <p>Explore inspiring destinations, check live weather and organize the places you want to visit.</p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/explore" className="btn btn-light btn-lg px-4">Explore destinations</Link>
            <Link to="/planner" className="btn btn-outline-light btn-lg px-4">Build a trip</Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-heading d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="eyebrow text-dark">INSPIRATION</span>
            <h2 className="fw-bold mb-1">Popular destinations</h2>
            <p className="text-secondary mb-0">A few places worth adding to your travel list.</p>
          </div>
          <Link to="/explore" className="btn btn-outline-dark d-none d-md-inline-flex">See all</Link>
        </div>

        <div className="row g-4">
          {featuredDestinations.map((destination) => (
            <div className="col-md-6 col-xl-3" key={destination.id}>
              <DestinationCard
                destination={destination}
                favourite={isFavourite(destination.id)}
                onToggleFavourite={toggleFavourite}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}