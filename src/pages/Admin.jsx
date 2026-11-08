import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  LuArrowLeft,
  LuFileSpreadsheet,
  LuFileText,
  LuInbox,
  LuLoaderCircle,
  LuLogOut,
  LuRefreshCw,
  LuSearch,
} from "react-icons/lu";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import { auth } from "../firebase";
import { SUBJECT_LABELS } from "../data/involvementData";
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

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
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

  const handleRefresh = () => {
    setLoading(true);
    setLoadError("");
    fetchInvolvementRequests()
      .then((items) => setRequests(items))
      .catch((error) => setLoadError(loadErrorMessage(error)))
      .finally(() => setLoading(false));
  };

  const handleSignOut = () => {
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
  const filteredRequests = query
    ? requests.filter((request) =>
        [
          request.fullName,
          request.email,
          request.subject,
          SUBJECT_LABELS[request.subject] ?? "",
          request.status ?? "new",
          request.message,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : requests;

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="border-b border-line bg-surface">
        <Container className="flex min-h-[76px] flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="/assets/fishermenMovementLogo.png"
              alt=""
              width="40"
              height="40"
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <strong className="block text-[15px] leading-[1.3] text-ink">
                Involvement requests
              </strong>
              <span className="block truncate text-[11.5px] text-muted">
                {user.email}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button to="/" variant="secondary" size="sm">
              <LuArrowLeft size={15} aria-hidden="true" />
              Back
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <LuRefreshCw
                size={15}
                className={loading ? "animate-spin-slow" : ""}
                aria-hidden="true"
              />
              Refresh
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
            >
              <LuLogOut size={15} aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </Container>
      </header>

      <main className="py-10">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-[clamp(1.6rem,3vw,2.2rem)]">
                Requests from the contact form
              </h1>
              <p className="mt-1 text-[13px] text-muted">
                {query
                  ? `${filteredRequests.length} of ${requests.length} request${
                      requests.length === 1 ? "" : "s"
                    } match your search.`
                  : `${requests.length} request${
                      requests.length === 1 ? "" : "s"
                    } received.`}
              </p>
            </div>

            {requests.length > 0 ? (
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
                <div className="relative w-full sm:w-[280px]">
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
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
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
                    variant="secondary"
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
                        No requests match your search.
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
        </Container>
      </main>
    </div>
  );
}
