import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import LookbookFeature from '../components/LookbookFeature';

// Sections stack in this order. To move one, move its line.
export default function Home() {
  return (
    <main>
      <Hero />
      <CarouselSection />
      <LookbookFeature />
    </main>
  );
}