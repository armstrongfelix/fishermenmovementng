import {
  LuArrowRight,
  LuBuilding2,
  LuCircleCheck,
  LuGraduationCap,
  LuHandshake,
  LuMapPin,
  LuMegaphone,
  LuShieldCheck,
  LuTarget,
  LuUsers,
} from "react-icons/lu";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import Eyebrow from "../components/common/Eyebrow";
import { SITE } from "../data/siteData";

const sectionClass = "py-16 sm:py-[76px] md:py-24";
const tintSectionClass =
  "border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24";

const benefits = [
  {
    icon: LuTarget,
    title: "Reach students directly",
    description:
      "Sessions are delivered inside schools and youth spaces, putting practical safety lessons in front of the students who need them most.",
  },
  {
    icon: LuShieldCheck,
    title: "Practical, trusted content",
    description:
      "Every module is built by cybersecurity practitioners and focuses on real scams, phishing attempts, and digital responsibility.",
  },
  {
    icon: LuMapPin,
    title: "Rooted in Aba",
    description:
      "The pilot is locally led, with a clear plan to expand across Abia State as the model proves itself.",
  },
];

const partnershipRoutes = [
  {
    icon: LuGraduationCap,
    title: "Schools & educators",
    description:
      "Host a free cyber safety session for your SS1–SS3 students and give them tools they can use immediately.",
  },
  {
    icon: LuBuilding2,
    title: "Sponsors",
    description:
      "Fund sessions, learning materials, or the expansion of the pilot to more schools and communities.",
  },
  {
    icon: LuUsers,
    title: "Volunteers",
    description:
      "Share cybersecurity, training, or facilitation experience and help deliver sessions on the ground.",
  },
  {
    icon: LuMegaphone,
    title: "Media",
    description:
      "Amplify the campaign with coverage, interviews, or community storytelling that reaches more young people.",
  },
];

const rad5Points = [
  "Access to cybersecurity practitioners, ethical hackers, and trainers who volunteer their time.",
  "A practical curriculum shaped by people working in the technology industry.",
  "A local technology hub with deep roots in the Aba community.",
];

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Together, we can make the internet safer for young people"
        description="We work with schools, sponsors, volunteers, and media to bring practical cyber safety education to students across Aba and Abia State."
        image="/assets/community-outreach.jpg"
      >
        <Button to="/contact" variant="light">
          Become a partner
          <LuArrowRight size={17} aria-hidden="true" />
        </Button>
        <Button to="/impact" variant="ghost-light">
          See our impact
        </Button>
      </PageHero>

      <section className={sectionClass}>
        <Container>
          <SectionHeading
            eyebrow="Why partner with us"
            title="A practical programme with a clear community outcome"
            description="Partnerships help us reach more students, strengthen the curriculum, and build a repeatable model for digital safety education."
          />
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  className="rounded-panel border border-line bg-surface p-[30px]"
                  key={benefit.title}
                >
                  <span className="mb-[18px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-primary/[0.08] text-primary">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg">{benefit.title}</h3>
                  <p className="mt-[9px] text-[13.5px] leading-[1.6] text-muted">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container>
          <SectionHeading
            eyebrow="Ways to partner"
            title="Find the route that fits your organisation"
            description="Whether you can host, fund, volunteer, or amplify, there is a meaningful way to support the movement."
            align="center"
          />
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {partnershipRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <article
                  className="rounded-card border border-line bg-surface p-6"
                  key={route.title}
                >
                  <span className="mb-[18px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-primary/[0.08] text-primary">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3 className="text-[15px]">{route.title}</h3>
                  <p className="mt-[9px] text-[13.5px] leading-[1.6] text-muted">
                    {route.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-[26px] flex items-center justify-between gap-6 rounded-card border border-line bg-surface px-[30px] py-[26px] max-sm:flex-col max-sm:items-start">
            <div>
              <h3 className="text-[17px]">Not sure where you fit?</h3>
              <p className="mt-1 text-[12.5px] text-muted">
                Tell us what you have in mind and we will find the right way to
                work together.
              </p>
            </div>
            <Button to="/contact" className="max-sm:w-full">
              Start a conversation
              <LuArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="relative overflow-hidden rounded-hero bg-navy p-[38px] text-white shadow-float max-sm:rounded-panel">
            <div
              className="pointer-events-none absolute -right-[70px] -top-[90px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.35),transparent_68%)]"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="mb-5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-white/[0.08] font-display text-[17px] font-bold tracking-[-0.02em] text-white">
                RAD5
              </span>
              <Eyebrow light className="mb-3">
                Our parent organisation
              </Eyebrow>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] text-white">
                {SITE.parent.name}
              </h2>
              <p className="mt-3.5 text-[14.5px] leading-[1.75] text-white/70">
                Fishermen Movement is an initiative under {SITE.parent.name}, a
                technology hub based in Aba, Abia State. The partnership gives
                the programme access to practitioners, trainers, and technology
                professionals who volunteer their time.
              </p>
              <Button
                href={SITE.parent.url}
                variant="ghost-light"
                className="mt-6"
              >
                Visit {SITE.parent.name}
                <LuArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Growing together"
              title="Expertise that strengthens every session"
              description="The programme draws on the hub's network to keep the curriculum practical, current, and grounded in real experience."
              className="mb-5!"
            />
            <ul className="grid gap-3">
              {rad5Points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-[11px] rounded-xl border border-line bg-surface px-[18px] py-[15px] text-[13.5px] leading-[1.55] text-ink-soft max-sm:p-[13px]"
                >
                  <LuCircleCheck
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-teal-500"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-[22px] inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-3.5 py-2 text-[11.5px] font-semibold text-primary-dark">
              <LuHandshake size={15} aria-hidden="true" />
              Open to new partnerships
            </div>
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
                We are looking for schools, sponsors, and volunteers who want to
                help more young people stay safe online.
              </p>
            </div>
            <div className="relative flex shrink-0 flex-col items-start gap-3.5 max-md:w-full max-sm:items-stretch">
              <Button to="/contact" variant="light" size="lg">
                Get in touch
                <LuArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to="/curriculum" variant="ghost-light">
                See how sessions work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
