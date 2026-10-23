import {
  ArrowRight,
  Calendar,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import {
  funding,
  impactCards,
  outcomes,
} from "../data/statsData";

const statIcons = {
  calendar: Calendar,
  "calendar-days": CalendarDays,
  "calendar-range": CalendarRange,
  users: Users,
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
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Planned reach"
            title="A realistic cadence, built around school terms"
            description="We work in weekly sessions, growing to a quarterly reach of 5,000 students without compromising the quality of each conversation."
            align="center"
          />

          <div className="impact-stat-grid">
            {impactCards.map((card) => (
              <StatCard
                key={card.label}
                value={card.value}
                suffix={card.suffix || ""}
                label={card.label}
                detail={card.detail}
                icon={statIcons[card.icon] || Users}
                accent="blue"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="funding-panel">
            <div className="funding-panel__copy">
              <span className="eyebrow">Funding the pilot</span>
              <h3>{funding.label}</h3>
              <p>
                Your support covers transport, learning materials, and
                facilitator time for school and community sessions across Aba.
              </p>
              <Button to="/contact">
                Become a supporter
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>

            <div className="funding-panel__progress">
              <div className="funding-panel__numbers">
                <div>
                  <span>Raised</span>
                  <strong>{formatNaira(funding.raised)}</strong>
                </div>
                <div>
                  <span>Goal</span>
                  <strong>{formatNaira(funding.goal)}</strong>
                </div>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={fundingPercent}
                aria-label="Pilot funding progress"
              >
                <span style={{ width: `${fundingPercent}%` }} />
              </div>
              <div className="funding-panel__footer">
                <span>{fundingPercent}% funded</span>
                <span>
                  <Target size={14} aria-hidden="true" />
                  Every contribution extends our reach
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Pilot projections"
            title="Cumulative and monthly student reach"
            description="These projections follow the three-month pilot window from mid-October to the end of December 2026."
          />

          <div className="chart-grid">
            <article className="chart-card">
              <div className="chart-card__head">
                <div>
                  <span className="chart-card__label">Cumulative reach</span>
                  <h3>Students reached over the pilot</h3>
                </div>
                <span className="chart-card__badge">
                  <TrendingUp size={16} aria-hidden="true" />
                  5,000 target
                </span>
              </div>

              <svg
                className="impact-chart"
                viewBox={`0 0 ${chart.width} ${chart.height}`}
                role="img"
                aria-label="Cumulative student reach: 1,666 in October, 3,332 in November, and 5,000 in December."
              >
                <defs>
                  <linearGradient id="impactArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="impactLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>

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
                        stroke="#e2e8f0"
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

                <path d={areaPath} fill="url(#impactArea)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#impactLine)"
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

            <article className="chart-card">
              <div className="chart-card__head">
                <div>
                  <span className="chart-card__label">Monthly breakdown</span>
                  <h3>Students reached per month</h3>
                </div>
                <span className="chart-card__badge">
                  <Calendar size={16} aria-hidden="true" />
                  Oct – Dec
                </span>
              </div>

              <div className="impact-bars" role="img" aria-label="Monthly student reach: October 1,666, November 1,666, December 1,668.">
                {monthlyReach.map((month) => (
                  <div className="impact-bars__group" key={month.label}>
                    <div className="impact-bars__track">
                      <div
                        className="impact-bars__bar"
                        style={{
                          height: `${(month.value / chart.max) * 100}%`,
                        }}
                      >
                        <span>{month.value.toLocaleString()}</span>
                      </div>
                    </div>
                    <span className="impact-bars__label">{month.label}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="impact-outcomes">
            <div className="impact-outcomes__intro">
              <SectionHeading
                eyebrow="What success looks like"
                title="Outcomes we will track beyond attendance"
                description="Reach is the starting point. We also want to see changes in awareness, confidence, and reporting behaviour."
              />
              <div className="impact-outcomes__callout">
                <Wallet size={22} aria-hidden="true" />
                <p>
                  The full pilot budget is{" "}
                  <strong>{formatNaira(funding.goal)}</strong>. Support can be
                  financial, in-kind, or volunteer time.
                </p>
              </div>
            </div>

            <ul className="outcome-list">
              {outcomes.map((outcome) => (
                <li key={outcome}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-panel">
            <div className="cta-panel__glow" aria-hidden="true" />
            <div className="cta-panel__copy">
              <span className="eyebrow eyebrow--light">Help us go further</span>
              <h2>Your support turns a school visit into a habit.</h2>
              <p>
                Partner with us as a school, sponsor, or volunteer and help more
                students learn how to stay safe online.
              </p>
            </div>
            <div className="cta-panel__actions">
              <Button to="/contact" variant="light" size="lg">
                Support the movement
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
