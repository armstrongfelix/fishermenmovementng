import {
  LuArrowRight,
  LuCalendar,
  LuCalendarDays,
  LuCalendarRange,
  LuCircleCheck,
  LuTarget,
  LuTrendingUp,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import Eyebrow from "../components/common/Eyebrow";
import {
  funding,
  impactCards,
  outcomes,
} from "../data/statsData";

const statIcons = {
  calendar: LuCalendar,
  "calendar-days": LuCalendarDays,
  "calendar-range": LuCalendarRange,
  users: LuUsers,
};

const monthlyReach = [
  { label: "October", value: 1666 },
  { label: "November", value: 1666 },
  { label: "December", value: 1668 },
];

const cumulativeReach = [
  { label: "October", value: 1666 },
  { label: "November", value: 3332 },
  { label: "December", value: 5000 },
];

const chart = {
  width: 640,
  height: 280,
  left: 48,
  right: 20,
  top: 20,
  bottom: 42,
  max: 5000,
};

const plotWidth = chart.width - chart.left - chart.right;
const plotHeight = chart.height - chart.top - chart.bottom;
const yBaseline = chart.top + plotHeight;

const chartPoints = cumulativeReach.map((item, index) => {
  const x =
    chart.left + (index / (cumulativeReach.length - 1)) * plotWidth;
  const y = chart.top + (1 - item.value / chart.max) * plotHeight;
  return { ...item, x, y };
});

const linePath = chartPoints
  .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
  .join(" ");

const areaPath = `${linePath} L ${
  chartPoints[chartPoints.length - 1].x
} ${yBaseline} L ${chartPoints[0].x} ${yBaseline} Z`;

const gridLines = [0, 1250, 2500, 3750, 5000];

const fundingPercent = Math.min(
  100,
  Math.round((funding.raised / funding.goal) * 100),
);

function formatNaira(value) {
  return `₦${value.toLocaleString("en-NG")}`;
}

const sectionClass = "py-16 sm:py-[76px] md:py-24";
const tintSectionClass =
  "border-y border-line bg-surface-alt py-16 sm:py-[76px] md:py-24";

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Reach and outcomes"
        title="Measuring what changes when students know better"
        description="The pilot phase is designed to reach more than 5,000 students and young people across Aba with practical cyber safety education."
        image="/assets/hero-students.jpg"
      >
        <Button to="/contact" variant="light">
          Support the pilot
          <LuArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className={sectionClass}>
        <Container>
          <SectionHeading
            eyebrow="Planned reach"
            title="A realistic cadence, built around school terms"
            description="We work in weekly sessions, growing to a quarterly reach of 5,000 students without compromising the quality of each conversation."
            align="center"
          />

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {impactCards.map((card) => (
              <StatCard
                key={card.label}
                value={card.value}
                suffix={card.suffix || ""}
                label={card.label}
                detail={card.detail}
                icon={statIcons[card.icon] || LuUsers}
                accent="blue"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-[26px] rounded-hero border border-line bg-surface p-10 shadow-card max-sm:p-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12">
            <div>
              <Eyebrow className="mb-2">Funding the pilot</Eyebrow>
              <h3 className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
                {funding.label}
              </h3>
              <p className="mb-[22px] mt-2.5 text-sm leading-[1.7] text-muted">
                Your support covers transport, learning materials, and
                facilitator time for school and community sessions across Aba.
              </p>
              <Button to="/contact">
                Become a supporter
                <LuArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>

            <div>
              <div className="mb-[13px] flex items-end justify-between gap-5 max-sm:flex-col max-sm:items-start max-sm:gap-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-muted">
                    Raised
                  </span>
                  <strong className="font-display text-[clamp(1.5rem,2.6vw,2rem)] tracking-[-0.03em]">
                    {formatNaira(funding.raised)}
                  </strong>
                </div>
                <div className="flex flex-col gap-0.5 text-right max-sm:text-left">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-muted">
                    Goal
                  </span>
                  <strong className="font-display text-[clamp(1.5rem,2.6vw,2rem)] tracking-[-0.03em]">
                    {formatNaira(funding.goal)}
                  </strong>
                </div>
              </div>
              <div
                className="relative h-3 overflow-hidden rounded-full bg-surface-alt shadow-[inset_0_1px_3px_rgba(11,27,51,0.06)]"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={fundingPercent}
                aria-label="Pilot funding progress"
              >
                <span
                  className="block h-full min-w-0 rounded-full bg-primary transition-[width] duration-[600ms]"
                  style={{ width: `${fundingPercent}%` }}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 text-[11.5px] text-muted">
                <span className="font-bold text-primary-dark">
                  {fundingPercent}% funded
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LuTarget size={14} aria-hidden="true" />
                  Every contribution extends our reach
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container>
          <SectionHeading
            eyebrow="Pilot projections"
            title="Cumulative and monthly student reach"
            description="These projections follow the three-month pilot window from mid-October to the end of December 2026."
          />

          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            <article className="rounded-panel border border-line bg-surface p-7 shadow-soft max-sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-3.5 max-sm:flex-col">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                    Cumulative reach
                  </span>
                  <h3 className="mt-1 text-lg">Students reached over the pilot</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary/[0.07] px-[11px] py-1.5 text-[10.5px] font-semibold text-primary-dark">
                  <LuTrendingUp size={16} aria-hidden="true" />
                  5,000 target
                </span>
              </div>

              <svg
                className="h-auto w-full"
                viewBox={`0 0 ${chart.width} ${chart.height}`}
                role="img"
                aria-label="Cumulative student reach: 1,666 in October, 3,332 in November, and 5,000 in December."
              >
                {gridLines.map((line) => {
                  const y =
                    chart.top + (1 - line / chart.max) * plotHeight;
                  return (
                    <g key={line}>
                      <line
                        x1={chart.left}
                        x2={chart.width - chart.right}
                        y1={y}
                        y2={y}
                        stroke="#bfdbfe"
                        strokeDasharray="4 6"
                      />
                      <text
                        x={chart.left - 12}
                        y={y + 4}
                        textAnchor="end"
                        fontSize="11"
                        fill="#64748b"
                      >
                        {line.toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                <path d={areaPath} fill="#2563eb" fillOpacity="0.16" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {chartPoints.map((point) => (
                  <g key={point.label}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="5.5"
                      fill="#ffffff"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />
                    <text
                      x={point.x}
                      y={point.y - 14}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="#0f172a"
                    >
                      {point.value.toLocaleString()}
                    </text>
                    <text
                      x={point.x}
                      y={chart.height - 14}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#64748b"
                    >
                      {point.label}
                    </text>
                  </g>
                ))}
              </svg>
            </article>

            <article className="rounded-panel border border-line bg-surface p-7 shadow-soft max-sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-3.5 max-sm:flex-col">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                    Monthly breakdown
                  </span>
                  <h3 className="mt-1 text-lg">Students reached per month</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary/[0.07] px-[11px] py-1.5 text-[10.5px] font-semibold text-primary-dark">
                  <LuCalendar size={16} aria-hidden="true" />
                  Oct – Dec
                </span>
              </div>

              <div
                className="flex h-[250px] items-end gap-3 border-b border-line bg-[linear-gradient(180deg,rgba(37,99,235,0.16)_1px,transparent_1px)] bg-[size:100%_25%] px-4 pt-4 sm:h-[300px] sm:gap-[22px]"
                role="img"
                aria-label="Monthly student reach: October 1,666, November 1,666, December 1,668."
              >
                {monthlyReach.map((month) => (
                  <div
                    className="flex h-full flex-1 flex-col items-center"
                    key={month.label}
                  >
                    <div className="flex w-full max-w-[92px] flex-1 items-end justify-center">
                      <div
                        className="relative w-full rounded-b-[3px] rounded-t-[10px] bg-sky-500 shadow-[0_12px_26px_-14px_rgba(37,99,235,0.6)] transition-[height] duration-[600ms]"
                        style={{
                          height: `${(month.value / chart.max) * 100}%`,
                        }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-ink">
                          {month.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="mt-2.5 text-[11px] text-muted">
                      {month.label}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className={tintSectionClass}>
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="What success looks like"
              title="Outcomes we will track beyond attendance"
              description="Reach is the starting point. We also want to see changes in awareness, confidence, and reporting behaviour."
              className="mb-6!"
            />
            <div className="flex items-start gap-3 rounded-xl border border-primary/[0.16] bg-primary/[0.04] p-[18px]">
              <LuWallet
                size={22}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-primary"
              />
              <p className="text-[12.5px] leading-[1.6] text-ink-soft">
                The full pilot budget is{" "}
                <strong>{formatNaira(funding.goal)}</strong>. Support can be
                financial, in-kind, or volunteer time.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-[11px] rounded-xl border border-line bg-surface p-[15px] text-[12.5px] leading-[1.55] text-ink-soft max-sm:p-[13px]"
              >
                <LuCircleCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-teal-500"
                />
                {outcome}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-[100px] pt-5 max-sm:pb-[76px] max-sm:pt-2.5">
        <Container>
          <div className="relative flex items-center justify-between gap-10 overflow-hidden rounded-hero bg-navy p-[54px] shadow-float max-md:flex-col max-md:items-start max-sm:rounded-panel max-sm:px-6 max-sm:py-8">
            <div
              className="pointer-events-none absolute -right-[70px] -top-[90px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.35),transparent_68%)]"
              aria-hidden="true"
            />
            <div className="relative max-w-[620px]">
              <Eyebrow light className="mb-3.5">
                Help us go further
              </Eyebrow>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] text-white">
                Your support turns a school visit into a habit.
              </h2>
              <p className="mt-3.5 text-[15px] leading-[1.7] text-white/70">
                Partner with us as a school, sponsor, or volunteer and help more
                students learn how to stay safe online.
              </p>
            </div>
            <div className="relative flex shrink-0 flex-col items-start gap-3.5 max-md:w-full max-sm:items-stretch">
              <Button to="/contact" variant="light" size="lg">
                Support the movement
                <LuArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
