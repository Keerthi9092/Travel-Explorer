
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="travel-footer">
      <div className="container">
        <div className="row g-4">

          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-logo">
              ✈️ Travel Explorer
            </h3>

            <p className="footer-description">
              Discover beautiful destinations, explore new places,
              check live weather and plan your perfect journey
              with Travel Explorer.
            </p>

            <div className="footer-socials">
              <a href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer">
                <i className="bi bi-youtube"></i>
              </a>

              <a href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading">Quick Links</h5>

            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/explore">Explore</Link>
              </li>

              <li>
                <Link to="/favourites">Favourites</Link>
              </li>

              <li>
                <Link to="/planner">Trip Planner</Link>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Explore</h5>

            <ul className="footer-links">
              <li>
                <Link to="/explore">Popular Destinations</Link>
              </li>

              <li>
                <Link to="/explore">Travel Inspiration</Link>
              </li>

              <li>
                <Link to="/explore">Weather Updates</Link>
              </li>

              <li>
                <Link to="/planner">Plan Your Journey</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Contact Us</h5>

            <p className="footer-contact">
              <i className="bi bi-envelope"></i>
              support@travelexplorer.com
            </p>

            <p className="footer-contact">
              <i className="bi bi-geo-alt"></i>
              Explore the world with us
            </p>

            <p className="footer-contact">
              <i className="bi bi-globe"></i>
              Your journey starts here
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Travel Explorer.
            All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}