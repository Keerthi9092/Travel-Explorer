import { useMemo, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const regions = ["All", ...new Set(destinations.map((item) => item.region))];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((item) => {
      const matchesQuery =
        !q ||
        [item.name, item.country, item.region, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesRegion = region === "All" || item.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [query, region]);

  const toggleFavourite = (id) => {
    const current = JSON.parse(localStorage.getItem("travel-favourites") || "[]");
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    localStorage.setItem("travel-favourites", JSON.stringify(next));
    window.dispatchEvent(new Event("storage"));
  };

  const isFavourite = (id) =>
    JSON.parse(localStorage.getItem("travel-favourites") || "[]").includes(id);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="eyebrow text-dark">DISCOVER</span>
        <h1 className="fw-bold">Explore destinations</h1>
        <p className="text-secondary">Search by destination, country, region or travel style.</p>
      </div>

      <div className="filter-panel p-3 p-md-4 mb-4">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input
                className="form-control border-start-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Paris, beach, Japan..."
              />
            </div>
          </div>
          <div className="col-lg-4">
            <select className="form-select form-select-lg" value={region} onChange={(e) => setRegion(e.target.value)}>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {results.map((destination) => (
          <div className="col-md-6 col-xl-4" key={destination.id}>
            <DestinationCard
              destination={destination}
              favourite={isFavourite(destination.id)}
              onToggleFavourite={toggleFavourite}
            />
          </div>
        ))}
      </div>

      {!results.length && (
        <div className="empty-state text-center py-5">
          <i className="bi bi-compass display-5"></i>
          <h4 className="mt-3">No destinations found</h4>
          <p className="text-secondary">Try another search or choose a different region.</p>
        </div>
      )}
    </div>
  );
}