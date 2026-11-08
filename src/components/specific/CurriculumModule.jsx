import { LuArrowUpRight, LuLock, LuMail, LuShieldAlert } from "react-icons/lu";

const iconMap = {
  lock: LuLock,
  "shield-alert": LuShieldAlert,
  mail: LuMail,
};

const accentClasses = {
  blue: "bg-primary-dark",
  teal: "bg-teal-700",
  cyan: "bg-sky-700",
};

export default function CurriculumModule({ module, index = 0 }) {
  const Icon = iconMap[module.icon] || LuLock;
  const reversed = index % 2 === 1;

  return (
    <article className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div
        className={`relative flex min-h-[300px] flex-col overflow-hidden rounded-panel p-[34px] text-white shadow-card max-sm:p-6 md:min-h-0 ${
          accentClasses[module.accent] || accentClasses.blue
        } ${reversed ? "md:order-2" : ""}`.trim()}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(140deg,rgba(0,0,0,0.9),transparent_70%)] [-webkit-mask-image:linear-gradient(140deg,rgba(0,0,0,0.9),transparent_70%)]"
          aria-hidden="true"
        />
        <span className="absolute right-[26px] top-5 font-display text-[64px] font-bold leading-none tracking-[-0.06em] text-white/25">
          {module.number}
        </span>
        <span className="relative mb-[30px] inline-flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/[0.24] bg-white/[0.14] backdrop-blur-[8px]">
          <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <p className="relative text-[10.5px] font-bold uppercase tracking-[0.17em] text-white/65">
          Module {module.number}
        </p>
        <h3 className="relative mt-2 text-[clamp(1.5rem,2.5vw,2rem)] text-white">
          {module.title}
        </h3>
        <p className="relative mt-3 text-[13.5px] leading-[1.65] text-white/75">
          {module.summary}
        </p>
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-[26px] text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">
          Interactive session
          <LuArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>

      <div className="rounded-panel border border-line bg-surface p-8 max-sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-line pb-4">
          <span className="text-xs font-bold uppercase tracking-[0.13em] text-ink">
            Topics covered
          </span>
          <span className="text-[11.5px] text-muted">
            {module.topics.length} lessons
          </span>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {module.topics.map((topic) => (
            <li
              key={topic}
              className="flex items-center gap-2.5 rounded-[10px] border border-line bg-page/70 px-[13px] py-3 text-[12.5px] leading-[1.4] text-ink-soft"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
