import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import TeamMember from "../components/specific/TeamMember";
import {
  aboutSections,
  beneficiaries,
  objectives,
} from "../data/aboutData";
import { team } from "../data/teamData";
import { pilotPhases } from "../data/statsData";

const benefitIcons = {
  graduation: GraduationCap,
  users: Users,
  book: BookOpen,
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About the movement"
        title="Digital safety education, built for Nigerian students"
        description="Fishermen Movement is a cyber safety, anti-phishing, and digital responsibility initiative for young people in Aba, Abia State."
        image="/assets/community-outreach.jpg"
      >
        <Button to="/curriculum" variant="light">
          Explore the curriculum
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
        <Button to="/contact" variant="ghost-light">
          Work with us
        </Button>
      </PageHero>

      <section className="section">
        <div className="container about-intro">
          <div>
            <SectionHeading
              eyebrow={aboutSections[0].eyebrow}
              title={aboutSections[0].title}
            />
            <div className="prose">
              {aboutSections[0].paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="about-fact-card">
            <span className="about-fact-card__icon">
              <Sparkles size={22} aria-hidden="true" />
            </span>
            <h3>At a glance</h3>
            <dl>
              <div>
                <dt>Location</dt>
                <dd>Aba, Abia State</dd>
              </div>
              <div>
                <dt>Pilot window</dt>
                <dd>Oct – Dec 2026</dd>
              </div>
              <div>
                <dt>Target reach</dt>
                <dd>5,000+ students</dd>
              </div>
              <div>
                <dt>Audience</dt>
                <dd>SS1 – SS3 students</dd>
              </div>
            </dl>
            <p>
              <MapPin size={15} aria-hidden="true" />
              Expanding across Abia State and beyond
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="about-split">
            {aboutSections.slice(1).map((section) => (
              <article className="about-split__card" key={section.id}>
                <span className="eyebrow">{section.eyebrow}</span>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container objectives-panel">
          <div>
            <SectionHeading
              eyebrow="What we set out to do"
              title="Eight objectives, one clear outcome"
              description="Every session is built around measurable shifts in awareness, behaviour, and confidence."
            />
            <p className="objectives-panel__note">
              We do not just tell students that cybercrime is dangerous. We show
              them what a phishing message looks like, how a scam unfolds, and
              what to do next.
            </p>
            <Button to="/curriculum" variant="secondary">
              See how the modules work
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <ul className="objectives-list">
            {objectives.map((objective) => (
              <li key={objective}>
                <CheckCircle2 size={18} aria-hidden="true" />
                {objective}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Who we serve"
            title="Students first, but the whole community benefits"
            description="Our primary audience is senior secondary students. Teachers, youth groups, and community spaces help the message travel further."
            align="center"
          />
          <div className="benefit-grid">
            {beneficiaries.map((item) => {
              const Icon = benefitIcons[item.icon] || Users;
              return (
                <article className="benefit-card" key={item.title}>
                  <span className="benefit-card__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Where we are going"
            title="A pilot today. A statewide network tomorrow."
            description="The first phase proves the model in Aba. The next phases expand it to more schools and communities across Abia State."
          />
          <div className="timeline">
            {pilotPhases.map((phase, index) => (
              <article className="timeline__item" key={phase.phase}>
                <div className="timeline__marker">
                  <span>{index + 1}</span>
                </div>
                <div className="timeline__content">
                  <div className="timeline__meta">
                    <span className="timeline__phase">{phase.phase}</span>
                    <span
                      className={`pill ${
                        phase.status === "In progress"
                          ? "pill--live"
                          : "pill--muted"
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>
                  <h3>{phase.name}</h3>
                  <p>{phase.description}</p>
                  <div className="timeline__details">
                    <span>{phase.date}</span>
                    <span>{phase.reach}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="The founding team"
            title="Cybersecurity students and builders from RAD5"
            description="A volunteer team of practitioners, developers, and mentors who believe digital safety is a basic skill."
            align="center"
          />
          <div className="team-grid team-grid--full">
            {team.map((member) => (
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
              <span className="eyebrow eyebrow--light">Partner with us</span>
              <h2>Bring digital safety to your school or community.</h2>
              <p>
                We are looking for schools, youth organisations, and partners who
                want to host a session or support the pilot phase.
              </p>
            </div>
            <div className="cta-panel__actions">
              <Button to="/contact" variant="light" size="lg">
                Get in touch
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
