import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Presentation,
  Smartphone,
  Users,
} from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import CurriculumModule from "../components/specific/CurriculumModule";
import { deliveryApproach, modules } from "../data/modulesData";

const approachIcons = {
  presentation: Presentation,
  smartphone: Smartphone,
  users: Users,
  "badge-check": BadgeCheck,
};

export default function Curriculum() {
  return (
    <>
      <PageHero
        eyebrow="Programme curriculum"
        title="Three modules that meet students where they are"
        description="Practical, interactive, and rooted in the online experiences of Nigerian secondary school students."
        image="/assets/training-session.jpg"
      >
        <Button to="/contact" variant="light">
          Invite us to your school
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Inside the programme"
            title="What students actually learn"
            description="Each module combines real-world examples, guided discussion, and simple habits students can use immediately."
            align="center"
          />

          <div className="curriculum-list">
            {modules.map((module, index) => (
              <CurriculumModule
                key={module.id}
                module={module}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="How a session runs"
            title="Not a lecture. A conversation with practical tools."
            description="Our facilitators keep sessions interactive so students can connect the lesson to their own devices and daily habits."
          />

          <div className="approach-grid">
            {deliveryApproach.map((item) => {
              const Icon = approachIcons[item.icon] || Presentation;
              return (
                <article className="approach-card" key={item.title}>
                  <span className="approach-card__icon">
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
        <div className="container curriculum-outcomes">
          <div>
            <SectionHeading
              eyebrow="Learning outcomes"
              title="Students leave with habits, not just information"
              description="Our sessions are designed to change behaviour: how students protect accounts, check links, and respond when something feels wrong."
            />
            <ul className="check-list">
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Recognise phishing across email, SMS, social media, and websites.
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Protect passwords, personal information, and privacy settings.
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Understand the consequences of cybercrime and unethical tech use.
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Know how and where to report a cyber incident.
              </li>
            </ul>
          </div>

          <aside className="curriculum-note">
            <span className="curriculum-note__label">Designed for</span>
            <h3>SS1 – SS3 students</h3>
            <p>
              Sessions are age-appropriate, free to attend, and delivered in
              schools, churches, innovation hubs, and youth-centred communities.
            </p>
            <div className="curriculum-note__facts">
              <span>45–60 minutes</span>
              <span>Interactive</span>
              <span>Free</span>
            </div>
            <Button to="/contact">
              Request a session
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
