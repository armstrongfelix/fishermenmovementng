import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Newspaper,
  X,
} from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import { newsArticles } from "../data/newsData";

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
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Latest"
            title="What is happening on the ground"
            description="Follow the pilot as we visit schools, train students, and build a community of digitally responsible young people."
          />

          <article className="news-featured">
            <div className="news-featured__media">
              <img src={featured.image} alt={featured.title} />
              <span className="news-featured__tag">{featured.category}</span>
            </div>
            <div className="news-featured__copy">
              <div className="news-meta">
                <span>
                  <CalendarDays size={14} aria-hidden="true" />
                  {featured.date}
                </span>
                <span>
                  <Clock3 size={14} aria-hidden="true" />
                  {featured.readingTime}
                </span>
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedArticle(featured)}
              >
                Read the story
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </article>

          <div className="news-grid">
            {rest.map((article) => (
              <article className="news-card" key={article.id}>
                <div className="news-card__media">
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <span className="news-card__tag">{article.category}</span>
                </div>
                <div className="news-card__body">
                  <div className="news-meta">
                    <span>
                      <CalendarDays size={13} aria-hidden="true" />
                      {article.date}
                    </span>
                    <span>
                      <Clock3 size={13} aria-hidden="true" />
                      {article.readingTime}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read more
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="news-footer">
            <span className="news-footer__icon">
              <Newspaper size={20} aria-hidden="true" />
            </span>
            <div>
              <h3>Stay close to the work</h3>
              <p>
                For interviews, photos, or programme updates, reach out to the
                team directly.
              </p>
            </div>
            <Button to="/contact" variant="secondary">
              Contact the team
            </Button>
          </div>
        </div>
      </section>

      {selectedArticle ? (
        <div
          className="article-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
          onClick={() => setSelectedArticle(null)}
        >
          <article
            className="article-modal__panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="article-modal__close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            <div className="article-modal__media">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
            </div>

            <div className="article-modal__body">
              <span className="news-card__tag news-card__tag--inline">
                {selectedArticle.category}
              </span>
              <h2>{selectedArticle.title}</h2>
              <div className="news-meta">
                <span>
                  <CalendarDays size={14} aria-hidden="true" />
                  {selectedArticle.date}
                </span>
                <span>
                  <Clock3 size={14} aria-hidden="true" />
                  {selectedArticle.readingTime}
                </span>
              </div>
              <div className="article-modal__content">
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
