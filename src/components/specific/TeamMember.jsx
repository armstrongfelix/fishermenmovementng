import { ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "../common/BrandIcons";

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
      <div className="team-card__avatar" aria-hidden="true">
        <span>{initials}</span>
      </div>
      <span className="team-card__role">{member.role}</span>
      <h3>{member.name}</h3>
      <p>{member.bio}</p>
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
    </article>
  );
}
