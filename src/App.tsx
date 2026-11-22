import { useCallback, useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { CraftMarquee } from './components/CraftMarquee';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Process } from './components/Process';
import { Faq } from './components/Faq';
import { Brief } from './components/Brief';
import { Footer } from './components/Footer';
import { MobileCta } from './components/MobileCta';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 34, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-tan"
    />
  );
}

export default function App() {
  // Spaces picked anywhere on the page (service rows or the form) feed one shared brief.
  const [spaces, setSpaces] = useState<string[]>([]);
  const toggleSpace = useCallback((id: string) => {
    setSpaces((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-walnut focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header briefCount={spaces.length} />
      <main>
        <Hero />
        <Intro />
        <CraftMarquee />
        <Services spaces={spaces} toggleSpace={toggleSpace} />
        <Gallery />
        <Process />
        <Faq />
        <Brief spaces={spaces} toggleSpace={toggleSpace} />
      </main>
      <Footer />
      <MobileCta briefCount={spaces.length} />
    </MotionConfig>
  );
}
