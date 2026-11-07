import { ArrowUpRight, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/BrandIcons";

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
    <article className={`team-card team-card--${member.accent || "blue"}`}>
      <div
        className="team-card__avatar"
        aria-hidden={member.image ? undefined : "true"}
      >
        {member.image ? (
          <img
            className="team-card__avatar-image"
            src={member.image}
            alt={member.name}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <span className="team-card__role">{member.role}</span>
      <h3>{member.name}</h3>
      <p>{member.bio}</p>
      {member.linkedin || member.portfolio || member.github ? (
        <div className="team-card__links">
          {member.linkedin ? (
            <a
              className="team-card__link"
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={15} />
              Connect on LinkedIn
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
          {member.github ? (
            <a
              className="team-card__link"
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={15} />
              View GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
          {member.portfolio ? (
            <a
              className="team-card__link"
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={15} />
              View portfolio
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
