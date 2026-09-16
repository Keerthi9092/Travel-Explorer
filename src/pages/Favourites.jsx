import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";

export default function Favourites() {
  const [ids, setIds] = useState([]);

  const sync = () => setIds(JSON.parse(localStorage.getItem("travel-favourites") || "[]"));

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const favourites = destinations.filter((item) => ids.includes(item.id));

  const toggle = (id) => {
    const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
    localStorage.setItem("travel-favourites", JSON.stringify(next));
    setIds(next);
  };

  return (
    <div className="container py-5">
      <span className="eyebrow text-dark">YOUR SAVED PLACES</span>
      <h1 className="fw-bold">Favourites</h1>
      <p className="text-secondary mb-4">Keep the destinations you want to remember for later.</p>

      {favourites.length ? (
        <div className="row g-4">
          {favourites.map((destination) => (
            <div className="col-md-6 col-xl-4" key={destination.id}>
              <DestinationCard destination={destination} favourite onToggleFavourite={toggle} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state text-center py-5">
          <i className="bi bi-heart display-5"></i>
          <h4 className="mt-3">No favourites yet</h4>
          <p className="text-secondary">Explore destinations and tap the heart to save them.</p>
        </div>
      )}
    </div>
  );
}