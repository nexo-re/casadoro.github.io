import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { INSTAGRAM_URL } from '../lib/data';
import { EASE, InstagramIcon } from './ui';

/** Thumb-reach call to action on small screens; steps aside once the brief form is on screen. */
export function MobileCta({ briefCount }: { briefCount: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const brief = document.getElementById('brief');
      const top = brief ? brief.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > window.innerHeight * 1.5 && top > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full bg-walnut p-1.5 shadow-[0_18px_40px_-12px_rgba(30,21,14,0.6)] md:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <a
            href="#brief"
            className="flex min-h-12 flex-1 items-center justify-between rounded-full bg-glow pl-5 pr-1.5 text-[0.95rem] font-medium text-soot"
          >
            <span className="flex items-center gap-2">
              Plan my interior
              {briefCount > 0 && (
                <span className="num grid h-5 min-w-5 place-items-center rounded-full bg-walnut px-1 text-[0.7rem] text-paper">
                  {briefCount}
                </span>
              )}
            </span>
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-walnut text-paper">
              <ArrowRight size={16} strokeWidth={1.75} />
            </span>
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CasaDoro Interiors on Instagram"
            className="on-dark grid h-12 w-12 shrink-0 place-items-center rounded-full text-paper"
          >
            <InstagramIcon size={20} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
