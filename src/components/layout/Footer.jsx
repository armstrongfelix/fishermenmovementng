import { Link } from "react-router-dom";
import { LuArrowUpRight, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Container from "../common/Container";
import { FOCUS_AREAS, NAV_LINKS, SITE } from "../../data/siteData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-5 overflow-hidden bg-[#061428] pt-[68px] text-white">
      <div
        className="pointer-events-none absolute -top-[180px] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_68%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="relative grid grid-cols-1 gap-[30px] pb-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.25fr)]">
          <div>
            <Link to="/" className="inline-flex min-w-0 items-center gap-[11px]">
              <img
                src="/assets/fishermenMovementLogo.png"
                alt=""
                className="h-14 w-14 shrink-0 rounded-full bg-white object-cover shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)] max-sm:h-12 max-sm:w-12"
                width="44"
                height="44"
              />
              <span className="flex min-w-0 flex-col">
                <strong className="font-display text-[17px] leading-[1.25] tracking-[-0.01em] text-white max-sm:text-[15px]">
                  {SITE.name}
                </strong>
                <small className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45 max-sm:text-[8px]">
                  {SITE.tagline}
                </small>
              </span>
            </Link>
            <p className="mt-[18px] max-w-[330px] text-[12.5px] leading-[1.7] text-white/60">
              {SITE.description}
            </p>

            <div className="mt-5 flex gap-2">
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fishermen Movement on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/5 text-white/75 transition-[background,color] duration-200 hover:bg-primary/40 hover:text-white"
              >
                <span className="inline-flex text-[18px]">
                  <InstagramIcon fontSize="inherit" />
                </span>
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fishermen Movement on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/5 text-white/75 transition-[background,color] duration-200 hover:bg-primary/40 hover:text-white"
              >
                <span className="inline-flex text-[18px]">
                  <LinkedInIcon fontSize="inherit" />
                </span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-body text-[10.5px] font-bold uppercase tracking-[0.15em] text-white">
              Explore
            </h3>
            <ul className="grid gap-[9px]">
              {NAV_LINKS.filter((link) => link.to !== "/").map((link) => (
                <li key={link.to} className="text-[12.5px] text-white/60">
                  <Link
                    to={link.to}
                    className="text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-body text-[10.5px] font-bold uppercase tracking-[0.15em] text-white">
              What we teach
            </h3>
            <ul className="grid gap-[9px]">
              {FOCUS_AREAS.map((area) => (
                <li key={area.title} className="text-[12.5px] text-white/60">
                  <Link
                    to="/curriculum"
                    className="text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-body text-[10.5px] font-bold uppercase tracking-[0.15em] text-white">
              Get in touch
            </h3>
            <ul className="grid gap-[9px]">
              <li className="flex items-start gap-2 text-[12.5px] text-white/60">
                <LuMapPin size={15} aria-hidden="true" className="mt-[3px] shrink-0 text-cyan-300" />
                {SITE.address}
              </li>
              <li className="flex items-start gap-2 text-[12.5px] text-white/60">
                <LuMail size={15} aria-hidden="true" className="mt-[3px] shrink-0 text-cyan-300" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-white/60 transition-colors duration-200 hover:text-white [overflow-wrap:anywhere]"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[12.5px] text-white/60">
                <LuPhone size={15} aria-hidden="true" className="mt-[3px] shrink-0 text-cyan-300" />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="text-white/60 transition-colors duration-200 hover:text-white"
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <Link
              className="mt-[18px] inline-flex items-center gap-1.5 rounded-full border border-white/[0.16] px-[13px] py-2 text-[11px] font-semibold text-white/85 transition-[background,border-color] duration-200 hover:border-white/30 hover:bg-white/[0.08]"
              to="/contact"
            >
              Start a conversation
              <LuArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/[0.09] py-[22px] text-[11px] text-white/40 max-sm:flex-col max-sm:items-start max-sm:gap-[5px]">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Made with purpose in {SITE.location}</p>
        </div>
      </Container>
    </footer>
  );
}
