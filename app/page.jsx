import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';

// Sections stack in this order. To move the carousel, move its line.
export default function Home() {
  return (
    <main>
      <Hero />
      <CarouselSection />
    </main>
  );
}
