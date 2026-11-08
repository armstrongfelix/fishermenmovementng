import Eyebrow from "./Eyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}) {
  return (
    <div
      className={`mb-11 max-w-[700px] max-sm:mb-8 ${
        align === "center" ? "mx-auto text-center" : ""
      } ${className}`.trim()}
    >
      {eyebrow ? (
        <Eyebrow
          light={light}
          className={`mb-3.5 ${align === "center" ? "justify-center" : ""}`.trim()}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.12] ${
          light ? "text-white" : ""
        }`.trim()}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-[15.5px] leading-[1.75] ${
            light ? "text-white/70" : "text-muted"
          }`.trim()}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
