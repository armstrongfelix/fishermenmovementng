import Container from "./Container";
import Eyebrow from "./Eyebrow";

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
      className={`relative flex min-h-[360px] items-center overflow-hidden bg-navy bg-cover bg-center pt-16 text-white ${
        compact
          ? "pb-[58px] sm:min-h-[340px] sm:pb-[62px] sm:pt-[68px]"
          : "pb-[58px] sm:min-h-[430px] sm:pb-[78px] sm:pt-[86px]"
      }`.trim()}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(112deg,rgba(4,16,35,0.96)_0%,rgba(4,16,35,0.8)_52%,rgba(4,16,35,0.48)_100%),linear-gradient(180deg,rgba(4,16,35,0.15),rgba(4,16,35,0.58))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(120deg,rgba(0,0,0,0.85),transparent_72%)] [-webkit-mask-image:linear-gradient(120deg,rgba(0,0,0,0.85),transparent_72%)]"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        <div className="max-w-[850px]">
          {eyebrow ? (
            <Eyebrow light className="mb-3.5">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <h1 className="text-[clamp(2.1rem,10vw,2.8rem)] leading-[1.05] tracking-[-0.03em] text-white sm:text-[clamp(2.35rem,4.6vw,4rem)]">
            {title}
          </h1>
          {description ? (
            <p className="mt-[18px] max-w-[680px] text-[14.5px] leading-[1.72] text-white/[0.78] sm:text-[16.5px]">
              {description}
            </p>
          ) : null}
          {children ? (
            <div className="mt-7 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
