import {
  LuArrowRight,
  LuBuilding2,
  LuClock3,
  LuGraduationCap,
  LuMail,
  LuMapPin,
  LuMessageSquare,
  LuPhone,
  LuUsers,
} from "react-icons/lu";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import ContactForm from "../components/specific/ContactForm";
import { SITE } from "../data/siteData";

const contactDetails = [
  {
    icon: LuMail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: LuPhone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    secondary: SITE.phoneAlt,
    secondaryHref: `tel:${SITE.phoneAlt.replace(/\s/g, "")}`,
  },
  {
    icon: LuMapPin,
    label: "Based in",
    value: SITE.address,
  },
  {
    icon: LuClock3,
    label: "Response time",
    value: "Within 48 hours",
  },
];

const enquiryTypes = [
  {
    icon: LuGraduationCap,
    title: "Schools & educators",
    description: "Host a free cyber safety session for your students.",
  },
  {
    icon: LuBuilding2,
    title: "Partners & sponsors",
    description: "Support the pilot or collaborate on a programme.",
  },
  {
    icon: LuUsers,
    title: "Volunteers",
    description: "Share your cybersecurity or training experience.",
  },
  {
    icon: LuMessageSquare,
    title: "Media",
    description: "Request an interview, photos, or programme details.",
  },
];

const detailValueClass =
  "mt-0.5 text-[12.5px] font-medium text-ink [overflow-wrap:anywhere]";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build a safer digital community together"
        description="Whether you want to host a session, support the pilot, or ask a question, the team would love to hear from you."
        image="/assets/hero-students.jpg"
        compact
      />

      <section className="py-16 sm:py-[76px] md:py-24">
        <Container className="grid grid-cols-1 items-start gap-11 lg:grid-cols-[minmax(0,1.35fr)_minmax(310px,0.65fr)]">
          <div className="rounded-panel border border-line bg-surface p-9 shadow-card max-sm:p-6">
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us how you would like to get involved"
              description="Fill in the form and the team will get back to you within two working days."
              className="mb-7!"
            />
            <ContactForm />
          </div>

          <aside className="grid gap-4">
            <div className="rounded-card border border-line bg-surface p-[26px]">
              <h3 className="mb-[18px] text-base">Reach us directly</h3>
              <ul className="grid gap-[18px]">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label} className="flex items-start gap-3">
                      <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-primary/[0.07] text-primary">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className={`${detailValueClass} hover:text-primary`}
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <span className={detailValueClass}>
                            {detail.value}
                          </span>
                        )}
                        {detail.secondary ? (
                          <a
                            className="mt-0.5 text-[11.5px] font-normal text-muted [overflow-wrap:anywhere]"
                            href={detail.secondaryHref}
                          >
                            {detail.secondary}
                          </a>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-surface p-[26px]">
              <h3 className="mb-[18px] text-base">Follow the movement</h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fishermen Movement on Instagram"
                  className="inline-flex items-center gap-[7px] rounded-full border border-line px-[13px] py-2 text-[11.5px] font-medium text-ink-soft transition-[border-color,color] duration-200 hover:border-primary/35 hover:text-primary-dark"
                >
                  <span className="inline-flex text-[18px]">
                    <InstagramIcon fontSize="inherit" />
                  </span>
                  Instagram
                </a>
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fishermen Movement on LinkedIn"
                  className="inline-flex items-center gap-[7px] rounded-full border border-line px-[13px] py-2 text-[11.5px] font-medium text-ink-soft transition-[border-color,color] duration-200 hover:border-primary/35 hover:text-primary-dark"
                >
                  <span className="inline-flex text-[18px]">
                    <LinkedInIcon fontSize="inherit" />
                  </span>
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we can help"
            title="Start with the conversation that fits you"
            description="Choose the route that best describes you. We will point you to the right next step."
            align="center"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enquiryTypes.map((type) => {
              const Icon = type.icon;
              return (
                <article
                  className="rounded-card border border-line bg-surface p-6"
                  key={type.title}
                >
                  <span className="mb-[18px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-primary/[0.08] text-primary">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3 className="text-[15px]">{type.title}</h3>
                  <p className="mt-[9px] text-[13.5px] leading-[1.6] text-muted">
                    {type.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-[26px] flex items-center justify-between gap-6 rounded-card border border-line bg-surface px-[30px] py-[26px] max-sm:flex-col max-sm:items-start">
            <div>
              <h3 className="text-[17px]">Prefer to invite us directly?</h3>
              <p className="mt-1 text-[12.5px] text-muted">
                Send your school or organisation name and preferred dates, and
                we will follow up with availability.
              </p>
            </div>
            <Button href={`mailto:${SITE.email}`} className="max-sm:w-full">
              Email the team
              <LuArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
