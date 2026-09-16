import { NavLink } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm travel-navbar">
      <div className="container-fluid px-3 px-lg-5">

        {/* Logo */}
        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <span className="brand-icon">✈️</span>
          Travel Explorer
        </NavLink>

        {/* Bootstrap Hamburger */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto gap-lg-2">

            <NavLink
              className="nav-link"
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className="nav-link"
              to="/explore"
            >
              Explore
            </NavLink>

            <NavLink
              className="nav-link"
              to="/favourites"
            >
              <i className="bi bi-heart me-1"></i>
              Favourites
            </NavLink>

            <NavLink
              className="nav-link"
              to="/planner"
            >
              <i className="bi bi-calendar2-check me-1"></i>
              Trip Planner
            </NavLink>

          </div>
        </div>

      </div>
    </nav>
  );
}