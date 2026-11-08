import { Link } from "react-router-dom";

const variants = {
  primary:
    "border-transparent bg-primary text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.7)] hover:shadow-[0_20px_38px_-14px_rgba(37,99,235,0.8)]",
  secondary:
    "border-line-strong bg-surface text-ink hover:border-primary/45 hover:text-primary-dark hover:shadow-soft",
  ghost:
    "border-transparent bg-transparent text-primary hover:bg-primary/[0.08]",
  light:
    "border-transparent bg-white text-ink shadow-[0_18px_36px_-18px_rgba(0,0,0,0.5)] hover:bg-[#f1f7ff]",
  "ghost-light":
    "border-white/35 bg-transparent text-white hover:border-white/60 hover:bg-white/10",
  nav: "border-primary/[0.18] bg-blue-100 text-primary-dark shadow-[0_10px_24px_-16px_rgba(37,99,235,0.6)] hover:border-primary/35 hover:bg-blue-200 hover:text-blue-800 hover:shadow-[0_16px_32px_-16px_rgba(37,99,235,0.7)] active:translate-y-0 active:scale-[0.97] active:bg-blue-300 active:text-blue-900 active:shadow-[0_8px_18px_-14px_rgba(37,99,235,0.6)]",
};

const sizes = {
  sm: "min-h-10 px-[17px] py-[9px] text-[13px]",
  md: "min-h-[46px] px-[22px] py-[11px] text-sm",
  lg: "min-h-[52px] px-[27px] py-[14px] text-[15px]",
};

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-[9px] rounded-full border font-semibold leading-[1.2] whitespace-nowrap transition-[transform,box-shadow,background,border-color,color] duration-[220ms] hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-65",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
