import { CheckCircle2, Loader2, Send } from "lucide-react";
import useForm from "../../hooks/useForm";
import Button from "../common/Button";

const initialValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Please add a little more detail (at least 20 characters).";
  }
  return errors;
}

export default function ContactForm() {
  const form = useForm({ initialValues, validate });

  const submit = form.handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
  });

  if (form.status === "success") {
    return (
      <div className="contact-success" role="status">
        <span className="contact-success__icon">
          <CheckCircle2 size={30} aria-hidden="true" />
        </span>
        <h3>Message ready to send</h3>
        <p>
          Thank you, {form.values.fullName.split(" ")[0]}. This demo form is
          front-end only, so nothing was sent to a server. Connect your email
          service or backend to start receiving messages.
        </p>
        <Button type="button" variant="secondary" onClick={form.reset}>
          Write another message
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.values.fullName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            aria-invalid={Boolean(form.errors.fullName)}
            aria-describedby={form.errors.fullName ? "fullName-error" : undefined}
          />
          {form.errors.fullName ? (
            <span className="form-error" id="fullName-error">
              {form.errors.fullName}
            </span>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            aria-invalid={Boolean(form.errors.email)}
            aria-describedby={form.errors.email ? "email-error" : undefined}
          />
          {form.errors.email ? (
            <span className="form-error" id="email-error">
              {form.errors.email}
            </span>
          ) : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="School visit, partnership, media inquiry..."
          value={form.values.subject}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          aria-invalid={Boolean(form.errors.subject)}
          aria-describedby={form.errors.subject ? "subject-error" : undefined}
        />
        {form.errors.subject ? (
          <span className="form-error" id="subject-error">
            {form.errors.subject}
          </span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="6"
          placeholder="Tell us how you would like to get involved or what you need."
          value={form.values.message}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          aria-invalid={Boolean(form.errors.message)}
          aria-describedby={form.errors.message ? "message-error" : undefined}
        />
        {form.errors.message ? (
          <span className="form-error" id="message-error">
            {form.errors.message}
          </span>
        ) : null}
      </div>

      {form.serverError ? (
        <div className="form-error form-error--box" role="alert">
          {form.serverError}
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="contact-form__submit"
        disabled={form.status === "submitting"}
      >
        {form.status === "submitting" ? (
          <>
            <Loader2 size={18} className="spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Send message
          </>
        )}
      </Button>

      <p className="form-note">
        We only use your details to respond to your message. This front-end
        demo does not store or transmit form data.
      </p>
    </form>
  );
}
