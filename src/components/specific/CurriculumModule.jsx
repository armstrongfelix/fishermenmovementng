import { ArrowUpRight, Lock, Mail, ShieldAlert } from "lucide-react";

const iconMap = {
  lock: Lock,
  "shield-alert": ShieldAlert,
  mail: Mail,
};

export default function CurriculumModule({ module, index = 0 }) {
  const Icon = iconMap[module.icon] || Lock;
  const reversed = index % 2 === 1;

  return (
    <article
      className={`curriculum-module curriculum-module--${module.accent} ${
        reversed ? "is-reversed" : ""
      }`.trim()}
    >
      <div className="curriculum-module__panel">
        <div className="curriculum-module__grid" aria-hidden="true" />
        <span className="curriculum-module__number">{module.number}</span>
        <span className="curriculum-module__icon">
          <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <p className="curriculum-module__eyebrow">Module {module.number}</p>
        <h3>{module.title}</h3>
        <p className="curriculum-module__summary">{module.summary}</p>
        <span className="curriculum-module__tag">
          Interactive session
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>

      <div className="curriculum-module__content">
        <div className="curriculum-module__content-head">
          <span>Topics covered</span>
          <span>{module.topics.length} lessons</span>
        </div>
        <ul className="topic-list">
          {module.topics.map((topic) => (
            <li key={topic}>
              <span className="topic-list__dot" aria-hidden="true" />
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
