import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
} from "../common/BrandIcons";
import { FOCUS_AREAS, NAV_LINKS, SITE } from "../../data/siteData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand brand--footer">
              <img
                src="/assets/logo.svg"
                alt=""
                className="brand__mark"
                width="44"
                height="44"
              />
              <span className="brand__text">
                <strong>{SITE.name}</strong>
                <small>{SITE.tagline}</small>
              </span>
            </Link>
            <p>{SITE.description}</p>
            <a
              className="footer-parent"
              href={SITE.parent.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by {SITE.parent.name}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <div className="footer-socials">
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fishermen Movement on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fishermen Movement on LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              {NAV_LINKS.filter((link) => link.to !== "/").map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>What we teach</h3>
            <ul>
              {FOCUS_AREAS.map((area) => (
                <li key={area.title}>
                  <Link to="/curriculum">{area.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h3>Get in touch</h3>
            <ul>
              <li>
                <MapPin size={15} aria-hidden="true" />
                {SITE.address}
              </li>
              <li>
                <Mail size={15} aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Phone size={15} aria-hidden="true" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </li>
            </ul>
            <Link className="footer-cta" to="/contact">
              Start a conversation
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Made with purpose in {SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}
