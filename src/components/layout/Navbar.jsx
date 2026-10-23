import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, ShieldCheck, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../../data/siteData";
import Button from "../common/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container navbar">
        <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
          <img
            src="/assets/logo.svg"
            alt=""
            className="brand__mark"
            width="44"
            height="44"
          />
          <span className="brand__text">
            <strong>{SITE.name}</strong>
            <small>An initiative under RAD5</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "is-active" : ""}`.trim()
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Button to="/contact" size="sm">
            Partner with us
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="mobile-nav" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav__link ${isActive ? "is-active" : ""}`.trim()
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button
            to="/contact"
            className="mobile-nav__cta"
            onClick={() => setOpen(false)}
          >
            <ShieldCheck size={18} aria-hidden="true" />
            Partner with us
          </Button>
        </div>
      ) : null}
    </header>
  );
}
