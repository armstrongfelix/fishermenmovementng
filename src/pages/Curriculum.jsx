import {
  LuArrowRight,
  LuBadgeCheck,
  LuCircleCheck,
  LuPresentation,
  LuSmartphone,
  LuUsers,
} from "react-icons/lu";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import CurriculumModule from "../components/specific/CurriculumModule";
import { deliveryApproach, modules } from "../data/modulesData";

const approachIcons = {
  presentation: LuPresentation,
  smartphone: LuSmartphone,
  users: LuUsers,
  "badge-check": LuBadgeCheck,
};

const approachIconAccents = [
  "bg-primary/[0.08] text-primary",
  "bg-cyan-500/[0.09] text-cyan-600",
  "bg-teal-500/10 text-teal-600",
  "bg-indigo-500/[0.09] text-indigo-500",
];

const sectionClass = "py-16 sm:py-[76px] md:py-24";
const tintSectionClass =
  "border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24";

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
          <LuArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className={sectionClass}>
        <Container>
          <SectionHeading
            eyebrow="Inside the programme"
            title="What students actually learn"
            description="Each module combines real-world examples, guided discussion, and simple habits students can use immediately."
            align="center"
          />

          <div className="grid gap-7">
            {modules.map((module, index) => (
              <CurriculumModule
                key={module.id}
                module={module}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container>
          <SectionHeading
            eyebrow="How a session runs"
            title="Not a lecture. A conversation with practical tools."
            description="Our facilitators keep sessions interactive so students can connect the lesson to their own devices and daily habits."
          />

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {deliveryApproach.map((item, index) => {
              const Icon = approachIcons[item.icon] || LuPresentation;
              return (
                <article
                  className="rounded-card border border-line bg-surface p-[26px]"
                  key={item.title}
                >
                  <span
                    className={`mb-[18px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] ${
                      approachIconAccents[index] || approachIconAccents[0]
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-[17px] tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-[9px] text-[13.5px] leading-[1.6] text-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Learning outcomes"
              title="Students leave with habits, not just information"
              description="Our sessions are designed to change behaviour: how students protect accounts, check links, and respond when something feels wrong."
              className="mb-6!"
            />
            <ul className="grid gap-3">
              <li className="flex items-start gap-[11px] text-[14.5px] leading-[1.55] text-ink-soft">
                <LuCircleCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-500"
                />
                Recognise phishing across email, SMS, social media, and websites.
              </li>
              <li className="flex items-start gap-[11px] text-[14.5px] leading-[1.55] text-ink-soft">
                <LuCircleCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-500"
                />
                Protect passwords, personal information, and privacy settings.
              </li>
              <li className="flex items-start gap-[11px] text-[14.5px] leading-[1.55] text-ink-soft">
                <LuCircleCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-500"
                />
                Understand the consequences of cybercrime and unethical tech use.
              </li>
              <li className="flex items-start gap-[11px] text-[14.5px] leading-[1.55] text-ink-soft">
                <LuCircleCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-500"
                />
                Know how and where to report a cyber incident.
              </li>
            </ul>
          </div>

          <aside className="rounded-panel bg-navy p-8 text-white shadow-float">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-sky-300">
              Designed for
            </span>
            <h3 className="mt-2.5 text-[27px] text-white">SS1 – SS3 students</h3>
            <p className="mt-[11px] text-[13.5px] leading-[1.7] text-white/[0.68]">
              Sessions are age-appropriate, free to attend, and delivered in
              schools, churches, innovation hubs, and youth-centred communities.
            </p>
            <div className="mb-6 mt-5 flex flex-wrap gap-[7px]">
              <span className="rounded-full border border-white/[0.18] px-[11px] py-[5px] text-[10.5px] font-semibold text-white/80">
                45–60 minutes
              </span>
              <span className="rounded-full border border-white/[0.18] px-[11px] py-[5px] text-[10.5px] font-semibold text-white/80">
                Interactive
              </span>
              <span className="rounded-full border border-white/[0.18] px-[11px] py-[5px] text-[10.5px] font-semibold text-white/80">
                Free
              </span>
            </div>
            <Button to="/contact">
              Request a session
              <LuArrowRight size={16} aria-hidden="true" />
            </Button>
          </aside>
        </Container>
      </section>
    </>
  );
}
