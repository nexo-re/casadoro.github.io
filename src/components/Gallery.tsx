import { useEffect, useLayoutEffect, useRef, useState, type FocusEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { HANDLE, INSTAGRAM_URL, works, type Work } from '../lib/data';
import { ArrowLink, EASE, Eyebrow, pad } from './ui';

const H_PINNED = 'min(52svh, 500px)';
const H_FLOW = 'min(52svh, 430px)';

function GalleryIntro({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Eyebrow>Selected work</Eyebrow>
      <h2 className="display mt-7 text-[clamp(2.4rem,5.4vw,5rem)]">
        No renders.
        <br />
        <em>Real rooms.</em>
      </h2>
      <p className="mt-6 max-w-[26rem] text-[1.1rem] text-umber">
        Sofas, storage, screens and kitchens as they were finished and photographed. Tap any of
        them for a closer look.
      </p>
    </div>
  );
}

function WorkCard({
  w,
  i,
  height,
  onOpen,
  onFocus,
  className = '',
}: {
  w: Work;
  i: number;
  height: string;
  onOpen: (i: number, el: HTMLElement) => void;
  onFocus?: (e: FocusEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <figure
      className={`shrink-0 snap-center ${className}`}
      style={{ width: `calc(${height} * ${w.ratio * (w.scale ?? 1)})`, maxWidth: '84vw' }}
    >
      <button
        type="button"
        onClick={(e) => onOpen(i, e.currentTarget)}
        onFocus={onFocus}
        aria-label={`Enlarge photo: ${w.title}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[4px] bg-linen"
        style={{ aspectRatio: String(w.ratio) }}
      >
        <img
          src={w.src}
          alt={w.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ objectPosition: w.pos }}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-walnut opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 size={15} strokeWidth={1.75} />
        </span>
      </button>
      <figcaption className="mt-4 flex gap-4">
        <span className="num pt-[0.35rem] text-umber">{pad(i + 1)}</span>
        <span>
          <span className="display block text-[1.5rem] leading-tight">{w.title}</span>
          <span className="mt-1.5 block text-[0.92rem] leading-snug text-umber">{w.detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function MoreCard({ height }: { height: string }) {
  return (
    <div
      className="flute relative flex shrink-0 snap-center items-end rounded-[4px] p-4"
      style={{ height: `calc(${height} * 0.86)`, width: 'min(21rem, 84vw)' }}
    >
      <div className="w-full rounded-[3px] bg-paper p-6">
        <p className="eyebrow text-umber">{HANDLE}</p>
        <p className="display mt-3 text-[1.9rem] leading-[1.05]">
          More designs, <em>and finished rooms.</em>
        </p>
        <ArrowLink href={INSTAGRAM_URL} external variant="outline-dark" className="mt-5">
          Open Instagram
        </ArrowLink>
      </div>
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (d: number) => void;
}) {
  const w = works[index];
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
      else if (e.key === 'Tab') {
        const nodes = boxRef.current?.querySelectorAll<HTMLElement>('button');
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNav]);

  const navBtn =
    'grid h-12 w-12 shrink-0 place-items-center rounded-full border border-paper/30 text-paper transition-colors hover:border-paper hover:bg-paper/10';

  return (
    <motion.div
      ref={boxRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${w.title}, photo ${index + 1} of ${works.length}`}
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-soot text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <span className="num text-paper/70">
          {pad(index + 1)} / {pad(works.length)}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo" className={navBtn}>
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 md:gap-8 md:px-8">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
          aria-label="Previous photo"
          className={`${navBtn} hidden sm:grid`}
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={w.src}
            src={w.src}
            alt={w.alt}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-full min-h-0 max-w-full rounded-[4px] object-contain sm:max-w-[calc(100%-8rem)]"
          />
        </AnimatePresence>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
          aria-label="Next photo"
          className={`${navBtn} hidden sm:grid`}
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-end justify-between gap-4 px-5 py-5 md:px-8" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-[40rem]">
          <p className="display text-[1.6rem]">{w.title}</p>
          <p className="mt-1 text-[0.95rem] text-paper/70">{w.detail}</p>
        </div>
        <div className="flex gap-2 sm:hidden">
          <button type="button" onClick={() => onNav(-1)} aria-label="Previous photo" className={navBtn}>
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => onNav(1)} aria-label="Next photo" className={navBtn}>
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [span, setSpan] = useState(0);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const maxX = useMotionValue(0);
  const pinned = wide && !reduce;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useLayoutEffect(() => {
    if (!pinned) return;
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const m = Math.max(0, el.scrollWidth - document.documentElement.clientWidth);
      maxX.set(m);
      setSpan(m);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned, maxX]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.3 });
  const x = useTransform<number, number>([smooth, maxX], ([p, m]) => -p * m);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(works.length, 1 + Math.floor(v * works.length)));
  });

  const open = (i: number, el: HTMLElement) => {
    trigger.current = el;
    setActive(i);
  };
  const close = useRef(() => {
    setActive(null);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }).current;
  const nav = useRef((d: number) => {
    setActive((a) => (a === null ? a : (a + d + works.length) % works.length));
  }).current;

  // Keyboard users: bring a focused card into the pinned viewport by scrolling the page.
  const onCardFocus = (e: FocusEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const wrap = wrapRef.current;
    const fig = el.closest('figure');
    if (!wrap || !fig || !el.matches(':focus-visible')) return;
    const start = wrap.getBoundingClientRect().top + window.scrollY;
    const target = Math.min(span, Math.max(0, fig.offsetLeft - window.innerWidth * 0.3));
    window.scrollTo({ top: start + target });
  };

  return (
    <section
      id="work"
      ref={wrapRef}
      className="relative scroll-mt-0 bg-paper/70"
      style={pinned ? { height: `calc(100vh + ${span}px)` } : undefined}
    >
      {pinned ? (
        <div className="sticky top-0 flex h-screen flex-col overflow-clip pt-16">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max flex-1 items-center gap-10 pl-10 pr-[14vw] will-change-transform"
          >
            <GalleryIntro className="w-[31rem] shrink-0 pr-6" />
            {works.map((w, i) => (
              <WorkCard
                key={w.src}
                w={w}
                i={i}
                height={H_PINNED}
                onOpen={open}
                onFocus={onCardFocus}
                className={i % 2 ? 'translate-y-[2.2svh]' : '-translate-y-[2.2svh]'}
              />
            ))}
            <MoreCard height={H_PINNED} />
          </motion.div>
          <div className="shell flex items-center gap-6 pb-7">
            <span className="num w-16 text-umber">
              {pad(current)} / {pad(works.length)}
            </span>
            <div className="relative h-px flex-1 bg-sand">
              <motion.div style={{ scaleX: smooth }} className="absolute inset-0 origin-left bg-walnut" />
            </div>
            <span className="eyebrow text-umber">Keep scrolling</span>
          </div>
        </div>
      ) : (
        <div className="py-24 md:py-32">
          <div className="shell">
            <GalleryIntro />
          </div>
          <div className="no-scrollbar mt-12 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-4 md:px-10">
            {works.map((w, i) => (
              <WorkCard key={w.src} w={w} i={i} height={H_FLOW} onOpen={open} />
            ))}
            <MoreCard height={H_FLOW} />
          </div>
          <p className="shell eyebrow mt-4 flex items-center gap-3 text-umber">
            <span aria-hidden className="h-px w-8 bg-current opacity-70" />
            Swipe for more
          </p>
        </div>
      )}

      <AnimatePresence>
        {active !== null && <Lightbox index={active} onClose={close} onNav={nav} />}
      </AnimatePresence>
    </section>
  );
}
