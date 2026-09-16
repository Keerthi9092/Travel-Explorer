import { Link } from "react-router-dom";

export default function DestinationCard({ destination, favourite, onToggleFavourite }) {
  return (
    <article className="card destination-card h-100 border-0 shadow-sm overflow-hidden">
      <div className="position-relative">
        <img src={destination.image} className="card-img-top destination-image" alt={destination.name} />
        <button
          type="button"
          className={`favourite-btn ${favourite ? "active" : ""}`}
          onClick={() => onToggleFavourite(destination.id)}
          aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
        >
          <i className={`bi ${favourite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>
      <div className="card-body p-4">
        <div className="small text-secondary mb-1">{destination.emoji} {destination.country}</div>
        <h5 className="card-title fw-bold">{destination.name}</h5>
        <p className="card-text text-secondary">{destination.description}</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {destination.tags.map((tag) => <span className="badge rounded-pill text-bg-light" key={tag}>{tag}</span>)}
        </div>
        <Link className="btn btn-dark w-100" to={`/destination/${destination.id}`}>
          View destination
        </Link>
      </div>
    </article>
  );
}