import { Link } from "react-router-dom";

const variants = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  ghost: "btn--ghost",
  light: "btn--light",
  "ghost-light": "btn--ghost-light",
};

const sizes = {
  sm: "btn--sm",
  md: "",
  lg: "btn--lg",
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
  const classes = ["btn", variants[variant], sizes[size], className]
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
