import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LuArrowRight, LuMenu, LuShieldCheck, LuX } from "react-icons/lu";
import { NAV_LINKS, SITE } from "../../data/siteData";
import Button from "../common/Button";
import Container from "../common/Container";

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
    <header
      className={`sticky top-0 z-[100] border-b bg-surface backdrop-blur-[18px] transition-[background,border-color,box-shadow] duration-[250ms] ${
        scrolled
          ? "border-line shadow-[0_12px_30px_-24px_rgba(11,27,51,0.45)]"
          : "border-transparent"
      }`.trim()}
    >
      <Container className="flex min-h-[76px] items-center justify-between gap-5">
        <Link
          to="/"
          className="inline-flex min-w-0 items-center gap-[11px]"
          aria-label={`${SITE.name} home`}
        >
          <img
            src="/assets/fishermenMovementLogo.png"
            alt=""
            className="h-12 w-12 shrink-0 rounded-full bg-white object-cover shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)] sm:h-14 sm:w-14"
            width="44"
            height="44"
          />
          <span className="flex min-w-0 flex-col">
            <strong className="font-display text-[15px] leading-[1.25] tracking-[-0.01em] text-ink sm:text-[17px]">
              {SITE.name}
            </strong>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-2.5 py-2 text-[13px] transition-[background,color] duration-200 xl:px-3 xl:text-[13.5px] ${
                  isActive
                    ? "bg-primary/10 font-semibold text-primary-dark"
                    : "font-medium text-ink-soft hover:bg-primary/[0.07] hover:text-primary-dark"
                }`.trim()
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <Button to="/admin" size="sm" variant="secondary">
            <LuShieldCheck size={16} aria-hidden="true" />
            Admin
          </Button>
          <Button to="/contact" size="sm" variant="nav">
            Partner with us
            <LuArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line-strong bg-white text-ink xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </Container>

      {open ? (
        <div
          className="flex flex-col gap-2.5 border-b border-line bg-white/[0.98] px-6 pb-[26px] pt-2.5 shadow-[0_24px_40px_-28px_rgba(11,27,51,0.5)] xl:hidden"
          id="mobile-navigation"
        >
          <nav className="grid gap-0.5" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-[10px] px-3.5 py-3 text-sm font-medium transition-[background,color] duration-200 ${
                    isActive
                      ? "bg-primary/[0.07] text-primary-dark"
                      : "text-ink-soft hover:bg-primary/[0.07] hover:text-primary-dark"
                  }`.trim()
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button
            to="/contact"
            variant="nav"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            <LuShieldCheck size={18} aria-hidden="true" />
            Partner with us
          </Button>
          <Button
            to="/admin"
            variant="secondary"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            <LuShieldCheck size={18} aria-hidden="true" />
            Admin
          </Button>
        </div>
      ) : null}
    </header>
  );
}
