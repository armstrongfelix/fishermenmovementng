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
  className = "",
}) {
  const [ref, display] = useCountUp(value);

  return (
    <article
      ref={ref}
      className={`relative overflow-hidden rounded-card border border-line bg-surface p-[26px] shadow-soft after:absolute after:-right-10 after:-top-10 after:h-[120px] after:w-[120px] after:rounded-full after:bg-[radial-gradient(circle,rgba(37,99,235,0.09),transparent_70%)] after:content-[''] ${className}`.trim()}
    >
      {Icon ? (
        <span className="mb-[17px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
          <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
        </span>
      ) : null}
      <div className="font-display text-[clamp(2rem,3vw,2.55rem)] font-bold leading-[1.05] tracking-[-0.035em] text-primary-dark">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-[13px] font-semibold text-ink">{label}</div>
      {detail ? (
        <p className="mt-[5px] text-xs leading-[1.5] text-muted">{detail}</p>
      ) : null}
    </article>
  );
}
