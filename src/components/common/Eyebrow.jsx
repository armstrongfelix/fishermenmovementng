export default function Eyebrow({ children, light = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.19em] before:h-0.5 before:w-[22px] before:rounded-full before:content-[''] ${
        light ? "text-sky-300 before:bg-cyan-300" : "text-primary before:bg-primary"
      } ${className}`.trim()}
    >
      {children}
    </span>
  );
}
