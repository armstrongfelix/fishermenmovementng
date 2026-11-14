import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  LuArrowLeft,
  LuChevronDown,
  LuFileSpreadsheet,
  LuFileText,
  LuInbox,
  LuKeyRound,
  LuListFilter,
  LuLoaderCircle,
  LuLogOut,
  LuMailCheck,
  LuMenu,
  LuSearch,
  LuUserPlus,
  LuX,
} from "react-icons/lu";
import Button from "../components/common/Button";
import { auth } from "../firebase";
import { SUBJECT_LABELS, SUBJECT_OPTIONS } from "../data/involvementData";
import {
  ADMIN_ROLE_LABELS,
  fetchAdminProfile,
} from "../services/adminAccounts";
import { fetchInvolvementRequests } from "../services/involvementRequests";

const fieldClass =
  "w-full rounded-[11px] border border-line-strong bg-[#fbfdff] px-3.5 py-3 text-left text-[13.5px] leading-[1.45] text-ink transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#9aa9bb] hover:border-[#b7c7d9] focus:border-primary/55 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.09)] focus:outline-none";

function authErrorMessage(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "Email and password sign-in is not enabled for this project yet.";
    default:
      return "Could not sign in. Please try again.";
  }
}

function resetErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
    case "auth/missing-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many reset requests. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "Password reset is not enabled for this project yet.";
    default:
      return "Could not send the reset link. Please try again.";
  }
}

function loadErrorMessage(error) {
  switch (error?.code) {
    case "permission-denied":
      return "This account does not have access to involvement requests.";
    case "unavailable":
      return "You appear to be offline. Check your connection and refresh.";
    default:
      return "Could not load involvement requests. Please try again.";
  }
}

function formatDate(timestamp) {
  const date = timestamp?.toDate?.();
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function Admin() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [view, setView] = useState("signin");
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetNotice, setResetNotice] = useState("");
  const [sendingReset, setSendingReset] = useState(false);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [adminProfile, setAdminProfile] = useState(null);
  const [asideOpen, setAsideOpen] = useState(false);
  const [exporting, setExporting] = useState("");
  const [exportError, setExportError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthLoading(false);
      if (nextUser) {
        setLoading(true);
      } else {
        setRequests([]);
        setLoadError("");
        setAdminProfile(null);
      }
    });
  }, []);

  useEffect(() => {
    if (!user) return undefined;

    let active = true;
    fetchInvolvementRequests()
      .then((items) => {
        if (!active) return;
        setRequests(items);
        setLoadError("");
      })
      .catch((error) => {
        if (active) setLoadError(loadErrorMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user) return undefined;

    let active = true;
    fetchAdminProfile(user.uid)
      .then((profile) => {
        if (active) setAdminProfile(profile);
      })
      .catch(() => {
        if (active) setAdminProfile(null);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setAuthError("");
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword("");
    } catch (error) {
      setAuthError(authErrorMessage(error?.code));
    } finally {
      setSigningIn(false);
    }
  };

  const handleShowReset = () => {
    setResetEmail(email.trim());
    setAuthError("");
    setResetError("");
    setResetNotice("");
    setView("reset");
  };

  const handleBackToSignIn = () => {
    setResetError("");
    setResetNotice("");
    setView("signin");
  };

  const handleSendReset = async (event) => {
    event.preventDefault();
    setResetError("");
    setResetNotice("");

    const address = resetEmail.trim();
    if (!address) {
      setResetError("Please enter the email linked to your admin account.");
      return;
    }

    setSendingReset(true);
    try {
      try {
        await sendPasswordResetEmail(auth, address, {
          url: `${window.location.origin}/admin`,
        });
      } catch (error) {
        if (error?.code !== "auth/unauthorized-continue-uri") throw error;
        await sendPasswordResetEmail(auth, address);
      }
      setResetNotice(
        `If an account exists for ${address}, a password reset link has been sent. Check that inbox and the spam folder.`,
      );
    } catch (error) {
      setResetError(resetErrorMessage(error?.code));
    } finally {
      setSendingReset(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setLoadError("");
    fetchInvolvementRequests()
      .then((items) => setRequests(items))
      .catch((error) => setLoadError(loadErrorMessage(error)))
      .finally(() => setLoading(false));
  };

  const handleSignOut = () => {
    setView("signin");
    signOut(auth);
  };

  const exportFileName = (extension) =>
    `involvement-requests-${new Date().toISOString().slice(0, 10)}.${extension}`;

  const buildExportRows = () =>
    filteredRequests.map((request) => ({
      Received: formatDate(request.createdAt),
      Name: request.fullName,
      Email: request.email,
      Subject: SUBJECT_LABELS[request.subject] ?? request.subject,
      Message: request.message,
      Status: request.status ?? "new",
    }));

  const handleExportExcel = async () => {
    setExportError("");
    setExporting("excel");
    try {
      const module = await import("xlsx");
      const XLSX = module.default ?? module;
      const worksheet = XLSX.utils.json_to_sheet(buildExportRows(), {
        header: ["Received", "Name", "Email", "Subject", "Message", "Status"],
      });
      worksheet["!cols"] = [
        { wch: 22 },
        { wch: 24 },
        { wch: 30 },
        { wch: 20 },
        { wch: 70 },
        { wch: 12 },
      ];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Involvement requests");
      XLSX.writeFile(workbook, exportFileName("xlsx"));
    } catch (error) {
      console.error(error);
      setExportError("Could not export to Excel. Please try again.");
    } finally {
      setExporting("");
    }
  };

  const handleExportPdf = async () => {
    setExportError("");
    setExporting("pdf");
    try {
      const { jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });
      doc.setFontSize(16);
      doc.text("Involvement requests", 40, 40);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `${filteredRequests.length} request${
          filteredRequests.length === 1 ? "" : "s"
        } · Generated ${new Date().toLocaleString("en-NG")}`,
        40,
        58,
      );
      autoTable(doc, {
        startY: 72,
        head: [["Received", "Name", "Email", "Subject", "Message", "Status"]],
        body: filteredRequests.map((request) => [
          formatDate(request.createdAt),
          request.fullName,
          request.email,
          SUBJECT_LABELS[request.subject] ?? request.subject,
          request.message,
          request.status ?? "new",
        ]),
        styles: {
          fontSize: 8,
          cellPadding: 4,
          overflow: "linebreak",
          valign: "top",
        },
        headStyles: { fillColor: [37, 99, 235], textColor: 255 },
        columnStyles: { 4: { cellWidth: 250 } },
        margin: { left: 40, right: 40 },
      });
      doc.save(exportFileName("pdf"));
    } catch (error) {
      console.error(error);
      setExportError("Could not export to PDF. Please try again.");
    } finally {
      setExporting("");
    }
  };

  const query = search.trim().toLowerCase();
  const hasActiveFilters = Boolean(query) || subjectFilter !== "all";
  const filteredRequests = requests.filter((request) => {
    if (subjectFilter !== "all" && request.subject !== subjectFilter) {
      return false;
    }
    if (!query) return true;
    return [
      request.fullName,
      request.email,
      request.subject,
      SUBJECT_LABELS[request.subject] ?? "",
      request.status ?? "new",
      request.message,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-alt">
        <span className="inline-flex items-center gap-3 text-sm font-medium text-muted">
          <LuLoaderCircle
            size={20}
            className="animate-spin-slow text-primary"
            aria-hidden="true"
          />
          Checking session...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative flex min-h-dvh items-center justify-center bg-surface-alt px-4 pb-10 pt-20 sm:py-16">
        <Button
          to="/"
          variant="secondary"
          size="sm"
          className="absolute left-4 top-4 sm:left-6 sm:top-6"
        >
          <LuArrowLeft size={16} aria-hidden="true" />
          Back
        </Button>
        <div className="w-full max-w-[420px] rounded-panel border border-line bg-surface p-6 text-center shadow-card sm:p-8">
          <img
            src="/assets/fishermenMovementLogo.png"
            alt="Fishermen Movement logo"
            width="128"
            height="128"
            className="mx-auto mb-4 h-24 w-24 rounded-full object-cover sm:mb-5 sm:h-[128px] sm:w-[128px]"
          />
          {view === "reset" ? (
            <>
              <h1 className="text-[22px] sm:text-[24px]">Reset password</h1>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted sm:text-[13.5px]">
                Enter the email linked to your admin account and we will send
                you a link to choose a new password.
              </p>

              <form className="mt-6 grid gap-4" onSubmit={handleSendReset}>
                <div className="flex flex-col gap-[7px]">
                  <label
                    htmlFor="reset-email"
                    className="text-left text-xs font-semibold text-ink"
                  >
                    Email address
                  </label>
                  <input
                    className={fieldClass}
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(event) => setResetEmail(event.target.value)}
                    required
                  />
                </div>

                {resetError ? (
                  <div
                    className="rounded-[10px] border border-danger/20 bg-danger/5 px-3.5 py-[11px] text-[11.5px] text-danger"
                    role="alert"
                  >
                    {resetError}
                  </div>
                ) : null}

                {resetNotice ? (
                  <div
                    className="flex flex-col gap-1 rounded-[10px] border border-success/25 bg-success/5 px-3.5 py-[11px] text-left text-[11.5px] leading-[1.6] text-success"
                    role="status"
                  >
                    <span className="flex items-center gap-1.5 font-semibold">
                      <LuMailCheck size={14} aria-hidden="true" />
                      Reset link sent
                    </span>
                    <span>{resetNotice}</span>
                  </div>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={sendingReset}
                >
                  {sendingReset ? (
                    <>
                      <LuLoaderCircle
                        size={18}
                        className="animate-spin-slow"
                        aria-hidden="true"
                      />
                      Sending link...
                    </>
                  ) : (
                    <>
                      <LuKeyRound size={18} aria-hidden="true" />
                      Send reset link
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="mx-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-primary hover:text-primary-dark hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  <LuArrowLeft size={14} aria-hidden="true" />
                  Back to sign in
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-[22px] sm:text-[24px]">Admin sign in</h1>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted sm:text-[13.5px]">
                Enter the admin email and password to view involvement requests.
              </p>

              <form className="mt-6 grid gap-4" onSubmit={handleSignIn}>
                <div className="flex flex-col gap-[7px]">
                  <label
                    htmlFor="admin-email"
                    className="text-left text-xs font-semibold text-ink"
                  >
                    Email address
                  </label>
                  <input
                    className={fieldClass}
                    id="admin-email"
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
                    htmlFor="admin-password"
                    className="text-left text-xs font-semibold text-ink"
                  >
                    Password
                  </label>
                  <input
                    className={fieldClass}
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                <div className="-mt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={handleShowReset}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:text-primary-dark hover:underline focus-visible:underline focus-visible:outline-none"
                  >
                    <LuKeyRound size={13} aria-hidden="true" />
                    Forgot password?
                  </button>
                </div>

                {authError ? (
                  <div
                    className="rounded-[10px] border border-danger/20 bg-danger/5 px-3.5 py-[11px] text-[11.5px] text-danger"
                    role="alert"
                  >
                    {authError}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={signingIn}
                >
                  {signingIn ? (
                    <>
                      <LuLoaderCircle
                        size={18}
                        className="animate-spin-slow"
                        aria-hidden="true"
                      />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt">
      <div className="flex w-full flex-col lg:flex-row">
        {asideOpen ? (
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={() => setAsideOpen(false)}
            className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          />
        ) : null}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[280px] max-w-[85vw] overflow-y-auto border-r border-line bg-surface transition-transform duration-300 ${
            asideOpen ? "translate-x-0" : "-translate-x-full"
          } lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[280px] lg:shrink-0 lg:translate-x-0`}
        >
          <div className="flex h-full flex-col gap-6 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/assets/fishermenMovementLogo.png"
                  alt=""
                  width="80"
                  height="80"
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <strong className="block text-[15px] leading-[1.3] text-ink">
                    Involvement requests
                  </strong>
                  <span className="block text-[11.5px] text-muted">
                    Admin dashboard
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close admin menu"
                onClick={() => setAsideOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition-colors hover:border-primary/45 hover:text-primary-dark focus-visible:outline-none lg:hidden"
              >
                <LuX size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-[12px] border border-line bg-[#fbfdff] p-3.5">
              <div className="flex items-center justify-between gap-2">
                <strong className="truncate text-[13px] font-semibold text-ink">
                  {adminProfile?.name ?? user.displayName ?? "Administrator"}
                </strong>
                <span className="shrink-0 rounded-full bg-primary/[0.08] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-primary">
                  {ADMIN_ROLE_LABELS[adminProfile?.role] ?? "Admin"}
                </span>
              </div>
              <span className="mt-0.5 block truncate text-[11.5px] text-muted">
                {user.email}
              </span>
            </div>

            {adminProfile?.role === "super-admin" ? (
              <nav
                className="flex flex-wrap gap-2 lg:grid"
                aria-label="Admin actions"
              >
                <Button
                  to="/admin/register"
                  variant="secondary"
                  size="sm"
                  className="lg:w-full lg:justify-start"
                >
                  <LuUserPlus size={15} aria-hidden="true" />
                  Add admin
                </Button>
              </nav>
            ) : null}

            <div className="mt-auto flex items-center gap-2">
              <Button
                to="/"
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <LuArrowLeft size={15} aria-hidden="true" />
                Back
              </Button>
              <Button
                type="button"
                variant="ghost-danger"
                size="sm"
                onClick={handleSignOut}
                className="flex-1"
              >
                <LuLogOut size={15} aria-hidden="true" />
                Sign out
              </Button>
            </div>
          </div>
        </aside>

        <main className="mx-auto w-full max-w-site min-w-0 flex-1 px-[18px] py-8 sm:px-6 sm:py-10 lg:px-8">
          <button
            type="button"
            onClick={() => setAsideOpen(true)}
            aria-label="Open admin menu"
            aria-expanded={asideOpen}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2.5 text-[13px] font-semibold text-ink shadow-soft transition-colors hover:border-primary/45 hover:text-primary-dark focus-visible:outline-none lg:hidden"
          >
            <LuMenu size={16} aria-hidden="true" />
            Menu
          </button>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-[clamp(1.6rem,3vw,2.2rem)]">
                Requests from the contact form
              </h1>
              <p className="mt-1 text-[13px] text-muted">
                {hasActiveFilters
                  ? `${filteredRequests.length} of ${requests.length} request${
                      requests.length === 1 ? "" : "s"
                    } match your filters.`
                  : `${requests.length} request${
                      requests.length === 1 ? "" : "s"
                    } received.`}
              </p>
              {requests.length > 0 ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="relative w-full max-w-[320px]">
                    <LuSearch
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search requests..."
                      aria-label="Search requests"
                      className="w-full rounded-[11px] border border-line-strong bg-[#fbfdff] py-2.5 pl-9 pr-3.5 text-left text-[13px] text-ink transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#9aa9bb] hover:border-[#b7c7d9] focus:border-primary/55 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.09)] focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <LuListFilter
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                      aria-hidden="true"
                    />
                    <select
                      value={subjectFilter}
                      onChange={(event) =>
                        setSubjectFilter(event.target.value)
                      }
                      aria-label="Filter requests by subject"
                      className="w-full min-w-[170px] cursor-pointer appearance-none rounded-[11px] border border-line-strong bg-[#fbfdff] py-2.5 pl-9 pr-8 text-left text-[13px] text-ink transition-[border-color,box-shadow,background] duration-200 hover:border-[#b7c7d9] focus:border-primary/55 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.09)] focus:outline-none"
                    >
                      <option value="all">All subjects</option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <LuChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                      aria-hidden="true"
                    />
                  </div>
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSubjectFilter("all");
                      }}
                      className="inline-flex h-10 items-center rounded-full px-3 text-[12px] font-semibold text-primary hover:bg-primary/[0.08] hover:text-primary-dark focus-visible:outline-none"
                    >
                      Clear filters
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            {requests.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="secondary-primary"
                  size="sm"
                  onClick={handleExportPdf}
                  disabled={exporting !== ""}
                >
                  {exporting === "pdf" ? (
                    <LuLoaderCircle
                      size={15}
                      className="animate-spin-slow"
                      aria-hidden="true"
                    />
                  ) : (
                    <LuFileText size={15} aria-hidden="true" />
                  )}
                  Export PDF
                </Button>
                <Button
                  type="button"
                  variant="secondary-success"
                  size="sm"
                  onClick={handleExportExcel}
                  disabled={exporting !== ""}
                >
                  {exporting === "excel" ? (
                    <LuLoaderCircle
                      size={15}
                      className="animate-spin-slow"
                      aria-hidden="true"
                    />
                  ) : (
                    <LuFileSpreadsheet size={15} aria-hidden="true" />
                  )}
                  Export Excel
                </Button>
              </div>
            ) : null}
          </div>

          {exportError ? (
            <div
              className="mb-5 rounded-[10px] border border-danger/20 bg-danger/5 px-4 py-3 text-[12.5px] text-danger"
              role="alert"
            >
              {exportError}
            </div>
          ) : null}

          {loadError ? (
            <div
              className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-danger/20 bg-danger/5 px-4 py-3 text-[12.5px] text-danger"
              role="alert"
            >
              {loadError}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                Try again
              </Button>
            </div>
          ) : null}

          {loading && requests.length === 0 ? (
            <div className="flex items-center justify-center rounded-panel border border-line bg-surface px-6 py-16 text-sm text-muted">
              <LuLoaderCircle
                size={20}
                className="mr-2 animate-spin-slow text-primary"
                aria-hidden="true"
              />
              Loading requests...
            </div>
          ) : null}

          {!loading && !loadError && requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-panel border border-line bg-surface px-6 py-16 text-center">
              <span className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-[15px] bg-primary/[0.08] text-primary">
                <LuInbox size={25} aria-hidden="true" />
              </span>
              <h2 className="text-[19px]">No requests yet</h2>
              <p className="mt-1.5 max-w-[420px] text-[13px] leading-[1.65] text-muted">
                Submissions from the contact form will appear here as soon as
                someone sends one.
              </p>
            </div>
          ) : null}

          {requests.length > 0 ? (
            <div className="overflow-x-auto rounded-panel border border-line bg-surface shadow-soft">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-[#f8fbff]">
                    {[
                      "Received",
                      "Name",
                      "Email",
                      "Subject",
                      "Message",
                      "Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-[13px] text-muted"
                      >
                        No requests match your search or filter.
                      </td>
                    </tr>
                  ) : null}
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-line align-top last:border-b-0 hover:bg-[#fbfdff]"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-[12px] text-muted">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-[13px] font-semibold text-ink">
                        {request.fullName}
                      </td>
                      <td className="px-4 py-4 text-[12.5px]">
                        <a
                          href={`mailto:${request.email}`}
                          className="text-primary hover:text-primary-dark hover:underline [overflow-wrap:anywhere]"
                        >
                          {request.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="inline-flex rounded-full bg-primary/[0.08] px-2.5 py-1 text-[11px] font-semibold text-primary">
                          {SUBJECT_LABELS[request.subject] ?? request.subject}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[12.5px] leading-[1.6] text-muted">
                        <p className="max-w-[360px] whitespace-pre-wrap [overflow-wrap:anywhere]">
                          {request.message}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-success/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-success">
                          {request.status ?? "new"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
