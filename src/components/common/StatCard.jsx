import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const [value, setValue] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? target : 0,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    let frame = 0;
    let started = false;

    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return [ref, value];
}

export default function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
  detail,
  icon: Icon,
  accent = "blue",
  className = "",
}) {
  const [ref, display] = useCountUp(value);

  return (
    <article
      ref={ref}
      className={`stat-card stat-card--${accent} ${className}`.trim()}
    >
      {Icon ? (
        <span className="stat-card__icon">
          <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
        </span>
      ) : null}
      <div className="stat-card__value">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="stat-card__label">{label}</div>
      {detail ? <p className="stat-card__detail">{detail}</p> : null}
    </article>
  );
}
