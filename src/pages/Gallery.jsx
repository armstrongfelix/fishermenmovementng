import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import {
  galleryCategories,
  galleryItems,
} from "../data/galleryData";

const categoryLabels = Object.fromEntries(
  galleryCategories
    .filter((category) => category.value !== "all")
    .map((category) => [category.value, category.label]),
);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter(
      (item) => item.category === activeCategory,
    );
  }, [activeCategory]);

  const activeItem =
    lightboxIndex === null ? null : filteredItems[lightboxIndex];

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    document.body.classList.add("no-scroll");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % filteredItems.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null
            ? null
            : (current - 1 + filteredItems.length) % filteredItems.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredItems.length]);

  const showPrevious = () => {
    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + filteredItems.length) % filteredItems.length,
    );
  };

  const showNext = () => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % filteredItems.length,
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Project gallery"
        title="Moments from the field"
        description="Classrooms, workshops, volunteers, and community conversations — a look at the work behind the movement."
        image="/assets/community-outreach.jpg"
      >
        <Button to="/contact" variant="light">
          Invite us to your community
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="gallery-head">
            <SectionHeading
              eyebrow="Our work in pictures"
              title="Every session starts with a conversation"
              description="Browse moments from school visits, training sessions, workshops, and community outreach."
            />
            <div className="filter-row" role="group" aria-label="Filter gallery">
              {galleryCategories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`filter-chip ${
                    activeCategory === category.value ? "is-active" : ""
                  }`.trim()}
                  aria-pressed={activeCategory === category.value}
                  onClick={() => {
                    setActiveCategory(category.value);
                    setLightboxIndex(null);
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <Images size={34} aria-hidden="true" />
              <h3>No moments in this category yet</h3>
              <p>Check back soon as the pilot gets underway.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredItems.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={`gallery-card ${
                    index % 5 === 0 ? "gallery-card--feature" : ""
                  }`.trim()}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="gallery-card__overlay">
                    <span className="gallery-card__category">
                      {categoryLabels[item.category]}
                    </span>
                    <span className="gallery-card__title">{item.title}</span>
                    <span className="gallery-card__caption">
                      {item.caption}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="gallery-footnote">
            <p>
              Want to bring a session to your school or youth group?
            </p>
            <Button to="/contact" variant="secondary" size="sm">
              <ArrowLeft size={15} aria-hidden="true" />
              Start a conversation
            </Button>
          </div>
        </div>
      </section>

      {activeItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <figure
            className="lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeItem.image} alt={activeItem.title} />
            <figcaption>
              <span className="gallery-card__category">
                {categoryLabels[activeItem.category]}
              </span>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.caption}</p>
              <span className="lightbox__count">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      ) : null}
    </>
  );
}
