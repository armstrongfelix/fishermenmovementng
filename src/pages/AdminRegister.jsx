import { useState } from "react";
import {
  LuArrowLeft,
  LuCheck,
  LuCopy,
  LuLoaderCircle,
  LuUserPlus,
} from "react-icons/lu";
import Button from "../components/common/Button";
import {
  ADMIN_ROLES,
  ADMIN_ROLE_LABELS,
  generatePassword,
  registerAdmin,
} from "../services/adminAccounts";

const fieldClass =
  "w-full rounded-[11px] border border-line-strong bg-[#fbfdff] px-3.5 py-3 text-left text-[13.5px] leading-[1.45] text-ink transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#9aa9bb] hover:border-[#b7c7d9] focus:border-primary/55 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.09)] focus:outline-none";

function registerErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email address already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Could not generate a strong enough password. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "permission-denied":
      return "Could not save the admin record. Check the Firestore rules and try again.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "Email and password sign-in is not enabled for this project yet.";
    default:
      return "Could not register the admin. Please try again.";
  }
}

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError("Please enter the admin's full name.");
      return;
    }
    if (!role) {
      setError("Please select a role for the admin.");
      return;
    }

    const password = generatePassword();
    setSubmitting(true);
    try {
      const account = await registerAdmin({
        name: trimmedName,
        email: email.trim(),
        role,
        password,
      });
      setCreated({ ...account, password });
      setName("");
      setEmail("");
      setRole("");
    } catch (submitError) {
      setError(registerErrorMessage(submitError?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(created.password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-surface-alt px-4 pb-10 pt-20 sm:py-16">
      <Button
        to="/admin"
        variant="secondary"
        size="sm"
        className="absolute left-4 top-4 sm:left-6 sm:top-6"
      >
        <LuArrowLeft size={16} aria-hidden="true" />
        Back
      </Button>

      <div className="w-full max-w-[460px] rounded-panel border border-line bg-surface p-6 text-center shadow-card sm:p-8">
        <img
          src="/assets/fishermenMovementLogo.png"
          alt="Fishermen Movement logo"
          width="128"
          height="128"
          className="mx-auto mb-4 h-24 w-24 rounded-full object-cover sm:mb-5 sm:h-[128px] sm:w-[128px]"
        />

        {created ? (
          <>
            <span className="mx-auto mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-success/10 text-success">
              <LuCheck size={26} aria-hidden="true" />
            </span>
            <h1 className="text-[22px] sm:text-[24px]">Admin account created</h1>
            <p className="mt-2 text-[13px] leading-[1.65] text-muted sm:text-[13.5px]">
              Share these sign-in details with {created.name}.
            </p>

            <dl className="mt-6 grid gap-3 rounded-[14px] border border-line bg-[#fbfdff] p-4 text-left">
              <div className="flex flex-col gap-0.5">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted">
                  Name
                </dt>
                <dd className="text-[13.5px] font-semibold text-ink">
                  {created.name}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted">
                  Email address
                </dt>
                <dd className="text-[13.5px] font-semibold text-ink [overflow-wrap:anywhere]">
                  {created.email}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted">
                  Role
                </dt>
                <dd className="text-[13.5px] font-semibold text-ink">
                  {ADMIN_ROLE_LABELS[created.role] ?? created.role}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted">
                  Password
                </dt>
                <dd className="flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-line-strong bg-white px-3 py-2">
                  <code className="text-[13.5px] font-semibold tracking-wide text-ink [overflow-wrap:anywhere]">
                    {created.password}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-primary hover:bg-primary/[0.08] hover:text-primary-dark focus-visible:outline-none"
                  >
                    {copied ? (
                      <>
                        <LuCheck size={13} aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <LuCopy size={13} aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-[11.5px] leading-[1.6] text-danger">
              This password is shown only once. Copy it before leaving this page.
            </p>

            <div className="mt-6 grid gap-2">
              <Button to="/admin" size="lg" className="w-full">
                Go to admin sign in
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => {
                  setCreated(null);
                  setCopied(false);
                  setError("");
                }}
              >
                <LuUserPlus size={16} aria-hidden="true" />
                Register another admin
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[22px] sm:text-[24px]">Register an admin</h1>
            <p className="mt-2 text-[13px] leading-[1.65] text-muted sm:text-[13.5px]">
              Add a new admin account. A sign-in password will be generated for
              them automatically.
            </p>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[7px]">
                <label
                  htmlFor="admin-name"
                  className="text-left text-xs font-semibold text-ink"
                >
                  Full name
                </label>
                <input
                  className={fieldClass}
                  id="admin-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-[7px]">
                <label
                  htmlFor="admin-register-email"
                  className="text-left text-xs font-semibold text-ink"
                >
                  Email address
                </label>
                <input
                  className={fieldClass}
                  id="admin-register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-[7px]">
                <label
                  htmlFor="admin-role"
                  className="text-left text-xs font-semibold text-ink"
                >
                  Role
                </label>
                <select
                  className={`${fieldClass} cursor-pointer`}
                  id="admin-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  required
                >
                  <option value="">Select a role</option>
                  {ADMIN_ROLES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {error ? (
                <div
                  className="rounded-[10px] border border-danger/20 bg-danger/5 px-3.5 py-[11px] text-[11.5px] text-danger"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <LuLoaderCircle
                      size={18}
                      className="animate-spin-slow"
                      aria-hidden="true"
                    />
                    Creating admin...
                  </>
                ) : (
                  <>
                    <LuUserPlus size={18} aria-hidden="true" />
                    Create admin account
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
