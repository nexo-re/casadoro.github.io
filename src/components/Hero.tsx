import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { ArrowLink, EASE } from './ui';

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const pinned = !reduce;
  const [playing, setPlaying] = useState(!reduce);
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? '/video/hero-mobile.mp4'
      : '/video/hero.mp4',
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });

  // The full-bleed film closes down into a framed panel as you scroll.
  const insetTop = useTransform(p, [0, 0.7], [0, 84]);
  const insetX = useTransform(p, [0, 0.7], [0, 4]);
  const insetBottom = useTransform(p, [0, 0.7], [0, 5]);
  const radius = useTransform(p, [0, 0.7], [0, 20]);
  const clipPath = useMotionTemplate`inset(${insetTop}px ${insetX}vw ${insetBottom}svh ${insetX}vw round ${radius}px)`;
  const videoScale = useTransform(p, [0, 1], [1.14, 1]);
  const shade = useTransform(p, [0.3, 0.8], [0, 0.32]);

  const headY = useTransform(p, [0, 0.45], [0, -90]);
  const headOpacity = useTransform(p, [0.04, 0.4], [1, 0]);
  const headVisibility = useTransform(p, (v) => (v > 0.42 ? 'hidden' : 'visible'));

  const beatOpacity = useTransform(p, [0.36, 0.66], [0, 1]);
  const beatY = useTransform(p, [0.36, 0.66], [50, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [reduce]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => undefined);
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="top" ref={ref} className={`relative ${pinned ? 'h-[175svh]' : 'h-svh'}`}>
      <div className="sticky top-0 h-svh min-h-[600px] overflow-hidden">
        <motion.div
          className="on-dark absolute inset-0 overflow-hidden bg-soot"
          style={pinned ? { clipPath } : undefined}
        >
          <motion.div className="absolute inset-0" style={pinned ? { scale: videoScale } : undefined}>
            <motion.video
              ref={videoRef}
              src={src}
              poster="/video/hero-poster.jpg"
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              initial={{ scale: 1.14 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.8, ease: EASE }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* warm grade + legibility */}
          <div aria-hidden className="absolute inset-0 bg-[#2a1a0e]/25" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,21,14,0.62)_0%,rgba(30,21,14,0.12)_30%,rgba(30,21,14,0.3)_55%,rgba(30,21,14,0.88)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_100%,rgba(30,21,14,0.7),transparent_70%)]"
          />
          <div aria-hidden className="grain absolute inset-0 opacity-[0.05]" />
          <motion.div aria-hidden className="absolute inset-0 bg-soot" style={{ opacity: pinned ? shade : 0 }} />

          {/* letterbox opens on load */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[14svh] origin-top bg-[#120c08]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[14svh] origin-bottom bg-[#120c08]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          />

          {/* beat one */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end"
            style={pinned ? { y: headY, opacity: headOpacity, visibility: headVisibility } : undefined}
          >
            <div className="shell pb-7 md:pb-11">
              <motion.p
                className="eyebrow flex items-center gap-3 text-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <span aria-hidden className="h-px w-8 bg-current opacity-70" />
                Interior design &amp; execution
              </motion.p>

              <h1 className="display mt-5 text-[clamp(2.65rem,7.6vw,7.5rem)] leading-[0.96] text-paper [text-wrap:initial]">
                <Line delay={0.75}>Spaces that flow,</Line>
                <Line delay={0.88}>
                  <em>made</em> for you.
                </Line>
              </h1>

              <div className="mt-7 grid gap-7 md:mt-9 md:grid-cols-[minmax(0,35rem)_1fr] md:items-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.25, ease: EASE }}
                >
                  <p className="max-w-[35rem] text-[1.05rem] leading-relaxed text-paper/85 md:text-[1.15rem]">
                    Complete interior design, custom sofas, wooden work, dining tables and modular
                    kitchens — made to measure, at affordable rates.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ArrowLink href="#brief" variant="cream">
                      Plan my interior
                    </ArrowLink>
                    <ArrowLink href="#work" variant="outline-light">
                      See the work
                    </ArrowLink>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between gap-6 md:justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  <a href="#intro" className="eyebrow group flex min-h-11 items-center gap-3 text-paper/80 hover:text-paper">
                    <span aria-hidden className="relative block h-9 w-px overflow-hidden bg-paper/25">
                      <span className="absolute inset-0 bg-glow [animation:cue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
                    </span>
                    Scroll
                  </a>
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? 'Pause background film' : 'Play background film'}
                    className="eyebrow flex min-h-11 items-center gap-3 text-paper/80 transition-colors hover:text-paper"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-paper/40">
                      {playing ? <Pause size={14} strokeWidth={1.75} /> : <Play size={14} strokeWidth={1.75} className="translate-x-px" />}
                    </span>
                    <span className="hidden whitespace-nowrap sm:inline">{playing ? 'Pause film' : 'Play film'}</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* beat two, revealed once the frame has closed in */}
          {pinned && (
            <motion.div
              className="pointer-events-none absolute inset-0 grid place-items-center px-[8vw] pt-16 text-center"
              style={{ opacity: beatOpacity, y: beatY }}
            >
              <div>
                <p className="eyebrow text-glow">
                  Sofas · Wood work · Kitchens<span className="hidden sm:inline"> · Partitions</span>
                </p>
                <p className="display mt-6 text-[clamp(2.3rem,6.4vw,6rem)] leading-[1.02] text-paper">
                  Designed with you.
                  <br />
                  <em>Made by us.</em>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
