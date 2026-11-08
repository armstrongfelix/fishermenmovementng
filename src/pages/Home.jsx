import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuCalendarDays,
  LuCircleCheck,
  LuMail,
  LuShieldAlert,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import Eyebrow from "../components/common/Eyebrow";
import SectionHeading from "../components/common/SectionHeading";
import TeamMember from "../components/specific/TeamMember";
import { FOCUS_AREAS } from "../data/siteData";
import { heroStats } from "../data/statsData";
import { modules } from "../data/modulesData";
import { team } from "../data/teamData";
import { outcomes } from "../data/statsData";

const focusIcons = {
  shield: LuShieldCheck,
  alert: LuShieldAlert,
  mail: LuMail,
  users: LuUsers,
};

const focusIconAccents = [
  "bg-primary/[0.08] text-primary",
  "bg-cyan-500/[0.09] text-cyan-600",
  "bg-teal-500/10 text-teal-600",
  "bg-indigo-500/[0.09] text-indigo-500",
];

const moduleAccents = {
  blue: "before:bg-primary",
  teal: "before:bg-teal-500",
  cyan: "before:bg-cyan-500",
};

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <img
          src="/assets/hero-students.jpg"
          alt="Nigerian students learning about cyber safety in a classroom"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,16,35,0.96)_0%,rgba(4,16,35,0.84)_42%,rgba(4,16,35,0.38)_100%),linear-gradient(180deg,rgba(4,16,35,0.25),rgba(4,16,35,0.7))]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(120deg,rgba(0,0,0,0.85),transparent_72%)] [-webkit-mask-image:linear-gradient(120deg,rgba(0,0,0,0.85),transparent_72%)]"
          aria-hidden="true"
        />

        <Container className="relative z-[2] grid min-h-[min(760px,calc(100vh-76px))] grid-cols-1 items-center pb-[74px] pt-16 lg:pb-[102px] lg:pt-[86px]">
          <div className="animate-fade-up">
            <span className="mb-[26px] inline-flex items-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.08] px-3.5 py-[7px] text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.88] backdrop-blur-[10px]">
              <LuSparkles size={14} aria-hidden="true" className="text-cyan-300" />
              Aba, Abia State · Nigeria
            </span>
            <h1 className="max-w-[780px] text-[clamp(2.35rem,11vw,3.1rem)] leading-[1.02] tracking-[-0.035em] text-white sm:text-[clamp(2.65rem,5.4vw,4.65rem)]">
              Protecting young minds
              <span className="block text-cyan-300"> in the digital age</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-[15.5px] leading-[1.75] text-white/[0.82] sm:text-[17.5px]">
              We equip secondary school students across Aba and Abia State with
              the knowledge to recognise cyber threats, avoid phishing, and make
              responsible digital choices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
              <Button to="/curriculum" size="lg">
                Explore our curriculum
                <LuArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="light" size="lg">
                Partner with us
              </Button>
            </div>
            <div className="mt-[38px] flex max-w-[560px] items-center gap-3 border-t border-white/[0.16] pt-6 max-sm:items-start">
              <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-cyan-300/[0.12] text-cyan-300">
                <LuShieldCheck size={18} aria-hidden="true" />
              </span>
              <p className="text-[13px] leading-[1.55] text-white/[0.67]">
                An initiative under{" "}
                <strong className="font-semibold text-white/[0.92]">
                  RAD5 Tech Hub
                </strong>{" "}
                — built by cybersecurity students and practitioners in Aba.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface" aria-label="Programme at a glance">
        <Container>
          <div className="grid grid-cols-2 gap-y-[18px] py-[22px] md:grid-cols-4 md:gap-y-0 md:py-[26px]">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-0.5 px-[18px] text-center ${
                  index === 0
                    ? ""
                    : `border-l border-line ${
                        index === 2 ? "max-md:border-l-0" : ""
                      }`
                }`.trim()}
              >
                <strong className="font-display text-[23px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[28px]">
                  {stat.value.toLocaleString()}
                  {stat.suffix || ""}
                </strong>
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.11em] text-muted sm:text-[11px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-[76px] md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why we exist"
            title="Digital access is growing. Digital safety must grow with it."
            description="Young people in Nigeria are online earlier, more often, and with less protection than ever. Our sessions turn everyday internet use into safer, more responsible habits."
            align="center"
          />
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS_AREAS.map((area, index) => {
              const Icon = focusIcons[area.icon] || LuShieldCheck;
              return (
                <article
                  className="rounded-card border border-line bg-surface p-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:border-primary/25 hover:shadow-card"
                  key={area.title}
                >
                  <span
                    className={`mb-[18px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] ${
                      focusIconAccents[index] || focusIconAccents[0]
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3 className="text-[17px] tracking-[-0.01em]">{area.title}</h3>
                  <p className="mt-[9px] text-[13.5px] leading-[1.6] text-muted">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24">
        <Container>
          <div className="mb-11 flex items-end justify-between gap-8 max-sm:mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-[18px]">
            <SectionHeading
              eyebrow="What students learn"
              title="Three focused modules. Practical, local, and interactive."
              description="Every session is designed for SS1–SS3 students and grounded in the online experiences they already have."
              className="mb-0!"
            />
            <Button to="/curriculum" variant="secondary">
              View full curriculum
              <LuArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {modules.map((module) => (
              <Link
                to="/curriculum"
                key={module.id}
                className={`relative flex flex-col overflow-hidden rounded-panel border border-line bg-surface p-7 transition-[transform,box-shadow,border-color] duration-[250ms] before:absolute before:left-7 before:right-7 before:top-0 before:h-[3px] before:rounded-b-full before:content-[''] hover:-translate-y-1 hover:border-primary/[0.22] hover:shadow-card ${
                  moduleAccents[module.accent] || moduleAccents.blue
                }`.trim()}
              >
                <span className="font-display text-xs font-bold tracking-[0.14em] text-primary">
                  {module.number}
                </span>
                <h3 className="mt-5 text-xl leading-[1.25]">{module.title}</h3>
                <p className="mt-[11px] flex-1 text-[13.5px] leading-[1.65] text-muted">
                  {module.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-[7px] text-[13px] font-semibold text-primary-dark">
                  Explore module
                  <LuArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-[76px] md:py-24">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <img
              src="/assets/community-outreach.jpg"
              alt="Community outreach session with students in Aba"
              className="aspect-[4/3] w-full rounded-hero object-cover shadow-float"
            />
            <div className="absolute bottom-5 right-5 flex items-center gap-[11px] rounded-[14px] border border-white/75 bg-white/[0.94] px-[17px] py-3.5 shadow-card backdrop-blur-[10px] max-sm:bottom-3 max-sm:right-3 max-sm:px-[13px] max-sm:py-[11px]">
              <LuUsers size={18} aria-hidden="true" className="text-primary" />
              <div className="flex flex-col leading-[1.2]">
                <strong className="font-display text-lg">5,000+</strong>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted">
                  students in the pilot
                </span>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="The pilot"
              title="A three-month campaign across schools and communities"
              description="From mid-October to the end of December 2026, we are taking practical cyber safety education into classrooms, churches, innovation hubs, and youth-centred spaces."
              className="mb-[26px]!"
            />
            <ul className="mb-7 grid gap-3">
              {outcomes.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-[11px] text-[14.5px] leading-[1.55] text-ink-soft"
                >
                  <LuCircleCheck
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-teal-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button to="/impact">
                See our impact plan
                <LuArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="ghost">
                Bring us to your school
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24">
        <Container>
          <div className="mb-11 flex items-end justify-between gap-8 max-sm:mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-[18px]">
            <SectionHeading
              eyebrow="The people behind it"
              title="Meet the founding voices"
              description="Cybersecurity specialist, Software Developers, and mentors from RAD5 Tech Hub driving digital safety awareness across Aba and beyond."
              className="mb-0!"
            />
            <Button to="/about" variant="secondary">
              Meet the team
              <LuArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {team.slice(0, 3).map((member) => (
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
                Get involved
              </Eyebrow>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] text-white">
                Help us reach the next classroom.
              </h2>
              <p className="mt-3.5 text-[15px] leading-[1.7] text-white/70">
                Invite us to your school, volunteer your skills, or partner with
                the movement to expand digital safety education in Abia State.
              </p>
            </div>
            <div className="relative flex shrink-0 flex-col items-start gap-3.5 max-md:w-full max-sm:items-stretch">
              <Button to="/contact" variant="light" size="lg">
                Start a conversation
                <LuArrowRight size={18} aria-hidden="true" />
              </Button>
              <span className="inline-flex items-center gap-[7px] text-xs text-white/55">
                <LuCalendarDays size={16} aria-hidden="true" />
                Pilot: Oct – Dec 2026
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
