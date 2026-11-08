import { useEffect, useMemo, useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
  LuImages,
  LuX,
} from "react-icons/lu";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import {
  galleryCategories,
  galleryItems,
} from "../data/galleryData";

const categoryLabels = Object.fromEntries(
  galleryCategories
    .filter((category) => category.value !== "all")
    .map((category) => [category.value, category.label]),
);

const categoryChipClass =
  "mb-[5px] w-fit rounded-full border border-white/[0.22] bg-white/10 px-[9px] py-1 text-[8.5px] font-bold uppercase tracking-[0.13em] text-sky-100 backdrop-blur-[8px]";

const lightboxButtonClass =
  "absolute z-[2] flex items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] text-white backdrop-blur-[8px] transition-colors duration-200 hover:bg-white/[0.18]";

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
          <LuArrowRight size={17} aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="py-16 sm:py-[76px] md:py-24">
        <Container>
          <div className="mb-[34px] flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-[22px]">
            <SectionHeading
              eyebrow="Our work in pictures"
              title="Every session starts with a conversation"
              description="Browse moments from school visits, training sessions, workshops, and community outreach."
              className="mb-0!"
            />
            <div className="flex flex-wrap gap-[7px]" role="group" aria-label="Filter gallery">
              {galleryCategories.map((category) => {
                const isActive = activeCategory === category.value;
                return (
                  <button
                    key={category.value}
                    type="button"
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-[background,border-color,color] duration-200 ${
                      isActive
                        ? "border-transparent bg-primary text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.6)]"
                        : "border-line-strong bg-surface text-ink-soft hover:border-primary/35 hover:text-primary-dark"
                    }`.trim()}
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveCategory(category.value);
                      setLightboxIndex(null);
                    }}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-5 py-[90px] text-center text-muted">
              <LuImages
                size={34}
                aria-hidden="true"
                className="text-line-strong"
              />
              <h3 className="text-[19px]">No moments in this category yet</h3>
              <p className="text-[13px]">Check back soon as the pilot gets underway.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredItems.map((item, index) => {
                const feature = index % 5 === 0;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`group relative overflow-hidden rounded-[18px] bg-navy text-left aspect-[4/3] ${
                      feature ? "sm:col-span-2 sm:aspect-[16/9]" : ""
                    }`.trim()}
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
                    />
                    <span className="absolute inset-0 flex flex-col justify-end gap-[3px] bg-[linear-gradient(180deg,transparent_28%,rgba(3,12,27,0.88)_100%)] p-5 text-white">
                      <span className={categoryChipClass}>
                        {categoryLabels[item.category]}
                      </span>
                      <span
                        className={`font-display font-semibold leading-[1.3] ${
                          feature ? "text-[21px]" : "text-base"
                        }`.trim()}
                      >
                        {item.title}
                      </span>
                      <span className="max-h-0 overflow-hidden text-[11.5px] leading-[1.45] text-white/70 opacity-0 transition-[max-height,opacity,margin] duration-300 group-hover:mt-[3px] group-hover:max-h-[60px] group-hover:opacity-100">
                        {item.caption}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-[34px] flex items-center justify-between gap-5 rounded-card border border-line bg-surface px-6 py-5 max-sm:flex-col max-sm:items-start">
            <p className="text-[13.5px] text-ink-soft">
              Want to bring a session to your school or youth group?
            </p>
            <Button to="/contact" variant="secondary" size="sm">
              <LuArrowLeft size={15} aria-hidden="true" />
              Start a conversation
            </Button>
          </div>
        </Container>
      </section>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[240] flex animate-fade-in items-end justify-center bg-[rgba(2,9,22,0.9)] p-10 px-3 pb-[22px] backdrop-blur-[12px] sm:items-center sm:p-14 sm:px-[18px] md:p-[60px]"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className={`${lightboxButtonClass} right-2.5 top-2.5 h-11 w-11 max-sm:right-2.5 max-sm:top-2.5 sm:right-[22px] sm:top-[22px]`.trim()}
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
          >
            <LuX size={22} />
          </button>

          <button
            type="button"
            className={`${lightboxButtonClass} left-2.5 top-1/2 h-[42px] w-[42px] -translate-y-1/2 max-sm:bottom-[18px] max-sm:top-auto max-sm:translate-y-0 md:left-[22px] md:h-12 md:w-12`.trim()}
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            <LuChevronLeft size={24} />
          </button>

          <figure
            className="m-0 w-full max-w-[880px] animate-scale-in overflow-hidden rounded-panel border border-white/[0.14] bg-ink shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] max-sm:mb-10"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[55vh] w-full bg-navy object-contain sm:max-h-[64vh]"
            />
            <figcaption className="px-[26px] py-[22px] text-white">
              <span className={categoryChipClass}>
                {categoryLabels[activeItem.category]}
              </span>
              <h3 className="mt-1.5 text-[21px] text-white">{activeItem.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-[1.55] text-white/[0.68]">
                {activeItem.caption}
              </p>
              <span className="mt-2.5 inline-block text-[10.5px] uppercase tracking-[0.1em] text-white/45">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${lightboxButtonClass} right-2.5 top-1/2 h-[42px] w-[42px] -translate-y-1/2 max-sm:bottom-[18px] max-sm:top-auto max-sm:translate-y-0 md:right-[22px] md:h-12 md:w-12`.trim()}
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <LuChevronRight size={24} />
          </button>
        </div>
      ) : null}
    </>
  );
}
