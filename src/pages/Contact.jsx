import {
  ArrowRight,
  Building2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
} from "../components/common/BrandIcons";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import ContactForm from "../components/specific/ContactForm";
import { SITE } from "../data/siteData";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    secondary: SITE.phoneAlt,
    secondaryHref: `tel:${SITE.phoneAlt.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: SITE.address,
  },
  {
    icon: Clock3,
    label: "Response time",
    value: "Within 48 hours",
  },
];

const enquiryTypes = [
  {
    icon: GraduationCap,
    title: "Schools & educators",
    description: "Host a free cyber safety session for your students.",
  },
  {
    icon: Building2,
    title: "Partners & sponsors",
    description: "Support the pilot or collaborate on a programme.",
  },
  {
    icon: Users,
    title: "Volunteers",
    description: "Share your cybersecurity or training experience.",
  },
  {
    icon: MessageSquare,
    title: "Media",
    description: "Request an interview, photos, or programme details.",
  },
];

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

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-form-panel">
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us how you would like to get involved"
              description="Fill in the form and the team will get back to you within two working days."
            />
            <ContactForm />
          </div>

          <aside className="contact-sidebar">
            <div className="contact-details">
              <h3>Reach us directly</h3>
              <ul>
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label}>
                      <span className="contact-details__icon">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="contact-details__label">
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a href={detail.href}>{detail.value}</a>
                        ) : (
                          <span className="contact-details__value">
                            {detail.value}
                          </span>
                        )}
                        {detail.secondary ? (
                          <a
                            className="contact-details__secondary"
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

            <div className="contact-socials">
              <h3>Follow the movement</h3>
              <div>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fishermen Movement on Instagram"
                >
                  <InstagramIcon size={18} />
                  Instagram
                </a>
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fishermen Movement on LinkedIn"
                >
                  <LinkedinIcon size={18} />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="contact-parent">
              <span className="contact-parent__label">An initiative under</span>
              <a
                href={SITE.parent.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.parent.name}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <p>
                A technology hub in Aba supporting practical digital skills and
                innovation across Abia State.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="How we can help"
            title="Start with the conversation that fits you"
            description="Choose the route that best describes you. We will point you to the right next step."
            align="center"
          />
          <div className="enquiry-grid">
            {enquiryTypes.map((type) => {
              const Icon = type.icon;
              return (
                <article className="enquiry-card" key={type.title}>
                  <span className="enquiry-card__icon">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                </article>
              );
            })}
          </div>

          <div className="contact-bottom-cta">
            <div>
              <h3>Prefer to invite us directly?</h3>
              <p>
                Send your school or organisation name and preferred dates, and
                we will follow up with availability.
              </p>
            </div>
            <Button href={`mailto:${SITE.email}`}>
              Email the team
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
