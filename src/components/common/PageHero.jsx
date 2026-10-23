export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  compact = false,
}) {
  return (
    <section
      className={`page-hero ${compact ? "page-hero--compact" : ""} ${
        image ? "page-hero--image" : ""
      }`.trim()}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="page-hero__overlay" aria-hidden="true" />
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="container page-hero__content">
        {eyebrow ? <span className="eyebrow eyebrow--light">{eyebrow}</span> : null}
        <h1 className="page-hero__title">{title}</h1>
        {description ? (
          <p className="page-hero__description">{description}</p>
        ) : null}
        {children ? <div className="page-hero__actions">{children}</div> : null}
      </div>
    </section>
  );
}
