import { LuArrowUpRight, LuGlobe } from "react-icons/lu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const accentClasses = {
  blue: "bg-primary shadow-[0_0_0_1px_rgba(37,99,235,0.16),0_12px_26px_-14px_rgba(37,99,235,0.65)]",
  teal: "bg-teal-700 shadow-[0_0_0_1px_rgba(20,184,166,0.18),0_12px_26px_-14px_rgba(20,184,166,0.65)]",
  cyan: "bg-sky-700 shadow-[0_0_0_1px_rgba(6,182,212,0.18),0_12px_26px_-14px_rgba(6,182,212,0.65)]",
  indigo:
    "bg-indigo-700 shadow-[0_0_0_1px_rgba(99,102,241,0.18),0_12px_26px_-14px_rgba(99,102,241,0.65)]",
};

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamMember({ member }) {
  const initials = getInitials(member.name);

  return (
    <article className="flex flex-col items-center rounded-panel border border-line bg-surface px-6 py-[30px] text-center transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-1 hover:border-primary/20 hover:shadow-card">
      <div
        className={`mb-[22px] flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full border-4 border-white font-display text-[41px] font-bold tracking-[-0.02em] text-white ${
          accentClasses[member.accent] || accentClasses.blue
        }`}
        aria-hidden={member.image ? undefined : "true"}
      >
        {member.image ? (
          <img
            className="h-full w-full object-cover object-top"
            src={member.image}
            alt={member.name}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <span className="inline-flex rounded-full bg-primary/[0.07] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.11em] text-primary-dark">
        {member.role}
      </span>
      <h3 className="mt-[11px] text-lg">{member.name}</h3>
      <p className="mt-[7px] flex-1 text-[13px] leading-[1.55] text-muted">
        {member.bio}
      </p>
      {member.linkedin || member.portfolio || member.github ? (
        <div className="mt-[17px] flex flex-col items-center gap-2">
          {member.linkedin ? (
            <a
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-primary hover:text-primary-dark"
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex text-[15px]">
                <LinkedInIcon fontSize="inherit" />
              </span>
              Connect on LinkedIn
              <LuArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
          {member.github ? (
            <a
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-primary hover:text-primary-dark"
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex text-[15px]">
                <GitHubIcon fontSize="inherit" />
              </span>
              View GitHub
              <LuArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
          {member.portfolio ? (
            <a
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-primary hover:text-primary-dark"
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuGlobe size={15} aria-hidden="true" />
              View portfolio
              <LuArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
