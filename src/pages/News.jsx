import { useEffect, useState } from "react";
import {
  LuArrowRight,
  LuCalendarDays,
  LuClock3,
  LuNewspaper,
  LuX,
} from "react-icons/lu";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import { newsArticles } from "../data/newsData";

const tagClass =
  "rounded-full bg-white/[0.94] px-[11px] py-[5px] text-[9.5px] font-bold uppercase tracking-[0.09em] text-primary-dark shadow-[0_6px_16px_-8px_rgba(0,0,0,0.35)]";

const metaClass = "flex flex-wrap gap-3.5 text-[11px] text-muted";

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [featured, ...rest] = newsArticles;

  useEffect(() => {
    if (!selectedArticle) return undefined;

    document.body.classList.add("no-scroll");
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedArticle(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArticle]);

  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="Stories from the movement"
        description="Programme updates, field reports, partnerships, and insights from our work across Aba and Abia State."
        image="/assets/training-session.jpg"
      >
        <Button to="/contact" variant="light">
          Media & press enquiries
          <LuArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="py-16 sm:py-[76px] md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Latest"
            title="What is happening on the ground"
            description="Follow the pilot as we visit schools, train students, and build a community of digitally responsible young people."
          />

          <article className="mb-[30px] grid grid-cols-1 overflow-hidden rounded-panel border border-line bg-surface shadow-card md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="relative min-h-[230px] sm:min-h-[280px] md:min-h-[340px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover"
              />
              <span className={`absolute left-4 top-4 ${tagClass}`}>
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col items-start justify-center p-[26px] sm:p-[38px]">
              <div className={metaClass}>
                <span className="inline-flex items-center gap-[5px]">
                  <LuCalendarDays size={14} aria-hidden="true" />
                  {featured.date}
                </span>
                <span className="inline-flex items-center gap-[5px]">
                  <LuClock3 size={14} aria-hidden="true" />
                  {featured.readingTime}
                </span>
              </div>
              <h2 className="mt-3.5 text-[clamp(1.5rem,2.5vw,2.1rem)]">
                {featured.title}
              </h2>
              <p className="mb-[22px] mt-3 text-sm leading-[1.7] text-muted">
                {featured.excerpt}
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedArticle(featured)}
              >
                Read the story
                <LuArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {rest.map((article) => (
              <article
                className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-card"
                key={article.id}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
                  />
                  <span className={`absolute left-4 top-4 ${tagClass}`}>
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-[22px]">
                  <div className={metaClass}>
                    <span className="inline-flex items-center gap-[5px]">
                      <LuCalendarDays size={13} aria-hidden="true" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-[5px]">
                      <LuClock3 size={13} aria-hidden="true" />
                      {article.readingTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[17px] leading-[1.3]">{article.title}</h3>
                  <p className="mb-4 mt-[9px] flex-1 line-clamp-3 text-[12.5px] leading-[1.6] text-muted">
                    {article.excerpt}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-[7px] self-start border-0 bg-transparent p-0 text-[13.5px] font-bold text-primary hover:text-primary-dark"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read more
                    <LuArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-[34px] flex items-center gap-[18px] rounded-card border border-line bg-surface px-[26px] py-6 max-sm:flex-col max-sm:items-start">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] bg-primary/[0.08] text-primary">
              <LuNewspaper size={20} aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="text-base">Stay close to the work</h3>
              <p className="mt-[3px] text-[12.5px] text-muted">
                For interviews, photos, or programme updates, reach out to the
                team directly.
              </p>
            </div>
            <Button to="/contact" variant="secondary" className="max-sm:w-full">
              Contact the team
            </Button>
          </div>
        </Container>
      </section>

      {selectedArticle ? (
        <div
          className="fixed inset-0 z-[240] flex animate-fade-in items-center justify-center bg-[rgba(2,9,22,0.78)] p-4 px-2.5 backdrop-blur-[10px] sm:p-10 sm:px-5"
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
          onClick={() => setSelectedArticle(null)}
        >
          <article
            className="relative max-h-[88vh] w-full max-w-[760px] animate-scale-in overflow-y-auto rounded-panel bg-surface shadow-float"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3.5 top-3.5 z-[2] flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line bg-white/[0.94] text-ink"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              <LuX size={20} />
            </button>

            <div className="max-h-[300px] overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <span
                className={`mb-3 inline-flex rounded-full bg-primary/[0.08] px-[11px] py-[5px] text-[9.5px] font-bold uppercase tracking-[0.09em] text-primary-dark`}
              >
                {selectedArticle.category}
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)]">
                {selectedArticle.title}
              </h2>
              <div className={`${metaClass} mt-3 border-b border-line pb-[18px]`}>
                <span className="inline-flex items-center gap-[5px]">
                  <LuCalendarDays size={14} aria-hidden="true" />
                  {selectedArticle.date}
                </span>
                <span className="inline-flex items-center gap-[5px]">
                  <LuClock3 size={14} aria-hidden="true" />
                  {selectedArticle.readingTime}
                </span>
              </div>
              <div className="mb-[26px] mt-5 grid gap-3.5 text-[14.5px] leading-[1.8] text-ink-soft">
                {selectedArticle.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedArticle(null)}
              >
                Close article
              </Button>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
