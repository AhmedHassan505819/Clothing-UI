import FlexCarousel from './FlexCarousel';
import { carouselItems } from '../data/carouselItems';

import './CarouselSection.css';

/**
 * Self-contained carousel section. To move it, just reorder it in your page:
 *   <Hero /> <CarouselSection /> <NextSection />
 *
 * Props (all optional):
 *   id       anchor id for links, default "collection"
 *   theme    "dark" | "light", default "dark" (same black as the hero)
 *   heading  small heading above the carousel, omit for none
 *   items    override the images; defaults to data/carouselItems.js
 *   ...rest  any FlexCarousel prop (preset, cardHeight, gap, intro, ...)
 */
export default function CarouselSection({
  id = 'collection',
  theme = 'dark',
  heading,
  items = carouselItems,
  ...carouselProps
}) {
  return (
    <section
      id={id}
      className={`carousel-section carousel-section--${theme}`}
      aria-label={heading ? undefined : 'Collection'}
      aria-labelledby={heading ? `${id}-heading` : undefined}
    >
      {heading && (
        <h2 id={`${id}-heading`} className="carousel-section__heading">
          {heading}
        </h2>
      )}
      <div className="carousel-section__stage">
        <FlexCarousel
          items={items}
          preset="liquid"
          intro="rise"
          cardHeight={0.74}
          gap={12}
          squeeze={0.2}
          fit="natural"
          radius={0}
          focusOnClick
          captions
          captureWheel={false}
          {...carouselProps}
        />
      </div>
    </section>
  );
}