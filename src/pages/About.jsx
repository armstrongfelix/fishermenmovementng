import {
  LuArrowRight,
  LuBookOpen,
  LuCircleCheck,
  LuGraduationCap,
  LuUsers,
} from "react-icons/lu";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import Eyebrow from "../components/common/Eyebrow";
import TeamMember from "../components/specific/TeamMember";
import {
  aboutSections,
  beneficiaries,
  objectives,
} from "../data/aboutData";
import { team } from "../data/teamData";
import { pilotPhases } from "../data/statsData";

const benefitIcons = {
  graduation: LuGraduationCap,
  users: LuUsers,
  book: LuBookOpen,
};

const sectionClass = "py-16 sm:py-[76px] md:py-24";
const tintSectionClass =
  "border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24";

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
          <LuArrowRight size={17} aria-hidden="true" />
        </Button>
        <Button to="/contact" variant="ghost-light">
          Work with us
        </Button>
      </PageHero>

      <section className={sectionClass}>
        <Container>
          <div>
            <SectionHeading
              eyebrow={aboutSections[0].eyebrow}
              title={aboutSections[0].title}
              className="mb-6!"
            />
            <div className="grid gap-[18px] text-[15.5px] leading-[1.8] text-ink-soft">
              {aboutSections[0].paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            {aboutSections.slice(1).map((section) => (
              <article
                className="rounded-panel border border-line bg-surface p-[34px] max-sm:p-6"
                key={section.id}
              >
                <Eyebrow className="mb-3.5">{section.eyebrow}</Eyebrow>
                <h3 className="mb-3.5 text-[23px]">{section.title}</h3>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-[14.5px] leading-[1.75] text-ink-soft ${
                      index > 0 ? "mt-3" : ""
                    }`.trim()}
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What we set out to do"
              title="Eight objectives, one clear outcome"
              description="Every session is built around measurable shifts in awareness, behaviour, and confidence."
              className="mb-5!"
            />
            <p className="mb-6 border-l-[3px] border-primary/30 pl-4 text-sm leading-[1.7] text-muted">
              We do not just tell students that cybercrime is dangerous. We show
              them what a phishing message looks like, how a scam unfolds, and
              what to do next.
            </p>
            <Button to="/curriculum" variant="secondary">
              See how the modules work
              <LuArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <ul className="grid gap-3">
            {objectives.map((objective) => (
              <li
                key={objective}
                className="flex items-start gap-[11px] rounded-xl border border-line bg-surface px-[18px] py-[15px] text-[13.5px] leading-[1.55] text-ink-soft max-sm:p-[13px]"
              >
                <LuCircleCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-500"
                />
                {objective}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container>
          <SectionHeading
            eyebrow="Who we serve"
            title="Students first, but the whole community benefits"
            description="Our primary audience is senior secondary students. Teachers, youth groups, and community spaces help the message travel further."
            align="center"
          />
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {beneficiaries.map((item) => {
              const Icon = benefitIcons[item.icon] || LuUsers;
              return (
                <article
                  className="rounded-panel border border-line bg-surface p-[30px]"
                  key={item.title}
                >
                  <span className="mb-[18px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-primary/[0.08] text-primary">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg">{item.title}</h3>
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
        <Container>
          <SectionHeading
            eyebrow="Where we are going"
            title="A pilot today. A statewide network tomorrow."
            description="The first phase proves the model in Aba. The next phases expand it to more schools and communities across Abia State."
          />
          <div className="relative mx-auto grid max-w-[900px] gap-5 before:absolute before:bottom-[18px] before:left-[18px] before:top-[18px] before:w-0.5 before:bg-primary before:content-[''] sm:before:left-[23px]">
            {pilotPhases.map((phase, index) => (
              <article
                className="relative grid grid-cols-[38px_minmax(0,1fr)] gap-3 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-5"
                key={phase.phase}
              >
                <div className="relative z-[1] flex items-start justify-center pt-[22px]">
                  <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-4 border-page bg-primary font-display text-[13px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.7)] sm:h-[46px] sm:w-[46px] sm:border-[5px] sm:text-[15px]">
                    {index + 1}
                  </span>
                </div>
                <div className="rounded-card border border-line bg-surface px-7 py-6 max-sm:p-5">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-primary">
                      {phase.phase}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] ${
                        phase.status === "In progress"
                          ? "bg-success/10 text-success shadow-[inset_0_0_0_1px_rgba(5,150,105,0.2)]"
                          : "bg-muted/10 text-muted shadow-[inset_0_0_0_1px_rgba(100,116,139,0.14)]"
                      }`.trim()}
                    >
                      {phase.status}
                    </span>
                  </div>
                  <h3 className="text-xl">{phase.name}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-muted">
                    {phase.description}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    <span className="rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                      {phase.date}
                    </span>
                    <span className="rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                      {phase.reach}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container>
          <SectionHeading
            eyebrow="The founding team"
            title="Cybersecurity Specialist and Software Developers"
            description="A volunteer team of practitioners, developers, and mentors who believe digital safety is a basic skill."
            align="center"
          />
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {team.map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-[100px] pt-5 max-sm:pb-[76px] max-sm:pt-2.5">
        <Container>
          <div className="relative flex items-center justify-between gap-10 overflow-hidden rounded-hero bg-navy p-[54px] shadow-float max-md:flex-col max-md:items-start max-sm:rounded-panel max-sm:px-6 max-sm:py-8">
            <div
              className="pointer-events-none absolute -right-[70px] -top-[90px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.35),transparent_68%)]"
              aria-hidden="true"
            />
            <div className="relative max-w-[620px]">
              <Eyebrow light className="mb-3.5">
                Partner with us
              </Eyebrow>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] text-white">
                Bring digital safety to your school or community.
              </h2>
              <p className="mt-3.5 text-[15px] leading-[1.7] text-white/70">
                We are looking for schools, youth organisations, and partners who
                want to host a session or support the pilot phase.
              </p>
            </div>
            <div className="relative flex shrink-0 flex-col items-start gap-3.5 max-md:w-full max-sm:items-stretch">
              <Button to="/contact" variant="light" size="lg">
                Get in touch
                <LuArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
