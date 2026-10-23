import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Button from "../components/common/Button";
import SectionHeading from "../components/common/SectionHeading";
import TeamMember from "../components/specific/TeamMember";
import { FOCUS_AREAS, SITE } from "../data/siteData";
import { heroStats } from "../data/statsData";
import { modules } from "../data/modulesData";
import { team } from "../data/teamData";
import { outcomes } from "../data/statsData";

const focusIcons = {
  shield: ShieldCheck,
  alert: ShieldAlert,
  mail: Mail,
  users: Users,
};

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <img
          src="/assets/hero-students.jpg"
          alt="Nigerian students learning about cyber safety in a classroom"
          className="home-hero__image"
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__grid" aria-hidden="true" />

        <div className="container home-hero__inner">
          <div className="hero-copy">
            <span className="hero-badge">
              <Sparkles size={14} aria-hidden="true" />
              Aba, Abia State · Nigeria
            </span>
            <h1>
              Protecting young minds
              <span className="text-gradient"> in the digital age</span>
            </h1>
            <p>
              We equip secondary school students across Aba and Abia State with
              the knowledge to recognise cyber threats, avoid phishing, and make
              responsible digital choices.
            </p>
            <div className="hero-actions">
              <Button to="/curriculum" size="lg">
                Explore our curriculum
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="light" size="lg">
                Partner with us
              </Button>
            </div>
            <div className="hero-note">
              <span className="hero-note__mark">
                <ShieldCheck size={18} aria-hidden="true" />
              </span>
              <p>
                An initiative under <strong>RAD5 Tech Hub</strong> — built by
                cybersecurity students and practitioners in Aba.
              </p>
            </div>
          </div>

          <aside className="hero-card" aria-label="Pilot phase snapshot">
            <div className="hero-card__status">
              <span className="pulse-dot" aria-hidden="true" />
              Pilot phase
            </div>
            <h2>Oct – Dec 2026</h2>
            <p className="hero-card__location">
              <MapPin size={15} aria-hidden="true" />
              {SITE.location}
            </p>
            <div className="hero-card__divider" />
            <div className="hero-card__rows">
              <div>
                <span>Students targeted</span>
                <strong>5,000+</strong>
              </div>
              <div>
                <span>Learning modules</span>
                <strong>3</strong>
              </div>
              <div>
                <span>Cost to students</span>
                <strong>Free</strong>
              </div>
            </div>
            <Link to="/impact" className="hero-card__link">
              See the impact plan
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="home-stats" aria-label="Programme at a glance">
        <div className="container">
          <div className="home-stats__grid">
            {heroStats.map((stat) => (
              <div className="home-stat" key={stat.label}>
                <strong>
                  {stat.value.toLocaleString()}
                  {stat.suffix || ""}
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why we exist"
            title="Digital access is growing. Digital safety must grow with it."
            description="Young people in Nigeria are online earlier, more often, and with less protection than ever. Our sessions turn everyday internet use into safer, more responsible habits."
            align="center"
          />
          <div className="focus-grid">
            {FOCUS_AREAS.map((area) => {
              const Icon = focusIcons[area.icon] || ShieldCheck;
              return (
                <article className="focus-card" key={area.title}>
                  <span className="focus-card__icon">
                    <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="split-head">
            <SectionHeading
              eyebrow="What students learn"
              title="Three focused modules. Practical, local, and interactive."
              description="Every session is designed for SS1–SS3 students and grounded in the online experiences they already have."
            />
            <Button to="/curriculum" variant="secondary">
              View full curriculum
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="module-preview-grid">
            {modules.map((module) => (
              <Link
                to="/curriculum"
                key={module.id}
                className={`module-preview module-preview--${module.accent}`}
              >
                <span className="module-preview__number">{module.number}</span>
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
                <span className="module-preview__link">
                  Explore module
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container impact-preview">
          <div className="impact-preview__media">
            <img
              src="/assets/community-outreach.jpg"
              alt="Community outreach session with students in Aba"
            />
            <div className="impact-preview__badge">
              <Users size={18} aria-hidden="true" />
              <div>
                <strong>5,000+</strong>
                <span>students in the pilot</span>
              </div>
            </div>
          </div>

          <div className="impact-preview__copy">
            <SectionHeading
              eyebrow="The pilot"
              title="A three-month campaign across schools and communities"
              description="From mid-October to the end of December 2026, we are taking practical cyber safety education into classrooms, churches, innovation hubs, and youth-centred spaces."
            />
            <ul className="check-list">
              {outcomes.slice(0, 4).map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="button-row">
              <Button to="/impact">
                See our impact plan
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="ghost">
                Bring us to your school
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="split-head">
            <SectionHeading
              eyebrow="The people behind it"
              title="Meet the founding voices"
              description="Cybersecurity students, developers, and mentors from RAD5 Tech Hub driving digital safety awareness across Aba and beyond."
            />
            <Button to="/about" variant="secondary">
              Meet the team
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="team-grid">
            {team.slice(0, 3).map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-panel">
            <div className="cta-panel__glow" aria-hidden="true" />
            <div className="cta-panel__copy">
              <span className="eyebrow eyebrow--light">Get involved</span>
              <h2>Help us reach the next classroom.</h2>
              <p>
                Invite us to your school, volunteer your skills, or partner with
                the movement to expand digital safety education in Abia State.
              </p>
            </div>
            <div className="cta-panel__actions">
              <Button to="/contact" variant="light" size="lg">
                Start a conversation
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <span className="cta-panel__detail">
                <CalendarDays size={16} aria-hidden="true" />
                Pilot: Oct – Dec 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
