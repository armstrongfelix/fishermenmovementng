import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { LuCircleCheck, LuLoaderCircle, LuSend } from "react-icons/lu";
import useForm from "../../hooks/useForm";
import Button from "../common/Button";
import { db } from "../../firebase";
import { SUBJECT_OPTIONS } from "../../data/involvementData";

const INVOLVEMENT_COLLECTION = "involvementRequests";

function friendlyError(error) {
  switch (error?.code) {
    case "permission-denied":
      return "We could not send your message right now. Please try again or email the team directly.";
    case "unavailable":
      return "You appear to be offline. Check your connection and try again.";
    case "resource-exhausted":
      return "We are receiving a lot of messages right now. Please try again in a few minutes.";
    default:
      return "Something went wrong while sending your message. Please try again or email the team directly.";
  }
}

const initialValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const fieldClass =
  "w-full rounded-[11px] border border-line-strong bg-[#fbfdff] px-3.5 py-3 text-[13.5px] leading-[1.45] text-ink transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#9aa9bb] hover:border-[#b7c7d9] focus:border-primary/55 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.09)] focus:outline-none aria-[invalid=true]:border-danger/55";

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please select a subject.";
  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Please add a little more detail (at least 20 characters).";
  }
  return errors;
}

export default function ContactForm() {
  const form = useForm({ initialValues, validate });

  const submit = form.handleSubmit(async (values) => {
    try {
      await addDoc(collection(db, INVOLVEMENT_COLLECTION), {
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(friendlyError(error), { cause: error });
    }
  });

  if (form.status === "success") {
    return (
      <div
        className="flex flex-col items-center px-5 py-10 text-center"
        role="status"
      >
        <span className="mb-4 inline-flex h-[58px] w-[58px] items-center justify-center rounded-full bg-success/10 text-success">
          <LuCircleCheck size={30} aria-hidden="true" />
        </span>
        <h3 className="text-[22px]">Message sent</h3>
        <p className="mb-[22px] mt-[9px] max-w-[480px] text-[13.5px] leading-[1.7] text-muted">
          Thank you, {form.values.fullName.split(" ")[0]}. Your message has been
          sent and the team will get back to you within two working days.
        </p>
        <Button type="button" variant="secondary" onClick={form.reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="grid gap-[17px]" onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="fullName" className="text-xs font-semibold text-ink">
            Full name
          </label>
          <input
            className={fieldClass}
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
            <span className="text-[11.5px] text-danger" id="fullName-error">
              {form.errors.fullName}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="email" className="text-xs font-semibold text-ink">
            Email address
          </label>
          <input
            className={fieldClass}
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
            <span className="text-[11.5px] text-danger" id="email-error">
              {form.errors.email}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-[7px]">
        <label htmlFor="subject" className="text-xs font-semibold text-ink">
          Subject
        </label>
        <select
          className={`${fieldClass} cursor-pointer`}
          id="subject"
          name="subject"
          value={form.values.subject}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          aria-invalid={Boolean(form.errors.subject)}
          aria-describedby={form.errors.subject ? "subject-error" : undefined}
        >
          <option value="">Select a subject</option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {form.errors.subject ? (
          <span className="text-[11.5px] text-danger" id="subject-error">
            {form.errors.subject}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-[7px]">
        <label htmlFor="message" className="text-xs font-semibold text-ink">
          Message
        </label>
        <textarea
          className={`${fieldClass} min-h-[130px] resize-y`}
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
          <span className="text-[11.5px] text-danger" id="message-error">
            {form.errors.message}
          </span>
        ) : null}
      </div>

      {form.serverError ? (
        <div
          className="rounded-[10px] border border-danger/20 bg-danger/5 px-3.5 py-[11px] text-[11.5px] text-danger"
          role="alert"
        >
          {form.serverError}
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-1 w-full"
        disabled={form.status === "submitting"}
      >
        {form.status === "submitting" ? (
          <>
            <LuLoaderCircle
              size={18}
              className="animate-spin-slow"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          <>
            <LuSend size={18} aria-hidden="true" />
            Send message
          </>
        )}
      </Button>

      <p className="text-center text-[11px] leading-[1.55] text-muted">
        We only use your details to respond to your message.
      </p>
    </form>
  );
}
