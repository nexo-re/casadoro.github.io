import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { steps } from '../lib/data';
import { EASE, Eyebrow, pad, ParallaxImage, Reveal } from './ui';

function Step({
  i,
  title,
  body,
  progress,
  still,
}: {
  i: number;
  title: string;
  body: string;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const at = (i / (steps.length - 1)) * 0.94;
  const bg = useTransform(progress, [at - 0.05, at + 0.01], ['#f3eadb', '#2f2118']);
  const fg = useTransform(progress, [at - 0.05, at + 0.01], ['#6b4f38', '#faf5ea']);
  const border = useTransform(progress, [at - 0.05, at + 0.01], ['#d9c6a9', '#2f2118']);
  return (
    <li className="relative pb-12 pl-[4.25rem] last:pb-0 md:pb-16 md:pl-24">
      <motion.span
        style={still ? undefined : { backgroundColor: bg, color: fg, borderColor: border }}
        className="num absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-walnut bg-walnut text-paper"
      >
        {pad(i + 1)}
      </motion.span>
      <Reveal>
        <h3 className="display pt-1 text-[clamp(1.6rem,2.6vw,2.25rem)]">{title}</h3>
        <p className="mt-3 max-w-[32rem] text-umber">{body}</p>
      </Reveal>
    </li>
  );
}

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.72', 'end 0.62'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });

  return (
    <section id="process" className="relative scroll-mt-16 py-24 md:py-36">
      <div className="shell grid gap-x-16 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="display mt-7 text-[clamp(2.4rem,5.4vw,5rem)]">
                How a room
                <br />
                <em>gets built.</em>
              </h2>
            </Reveal>

            <figure className="relative mt-12 w-full max-w-[24rem] lg:w-[min(23rem,40svh)]">
              <div aria-hidden className="flute absolute -right-4 -top-4 h-[48%] w-[48%] rounded-[4px] md:-right-5 md:-top-5" />
              <motion.div
                className="relative"
                initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 1.3, ease: EASE }}
              >
                <ParallaxImage
                  src="/work/understair-storage.jpg"
                  alt="Under-stair storage by CasaDoro Interiors, fitted with a glass display cabinet, TV niche and drawer units"
                  pos="40% 60%"
                  amount={5}
                  className="aspect-[4/5] rounded-[4px]"
                />
                <span className="eyebrow absolute left-3 top-3 rounded-full bg-paper/95 px-3.5 py-2 text-walnut">
                  Step 04 · Fitted
                </span>
              </motion.div>
              <figcaption className="relative mt-4 max-w-[22rem] pl-1 text-[0.92rem] leading-snug text-umber">
                Under-stair storage, made to follow the staircase and fitted on site.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <ol ref={listRef} className="relative">
            <span aria-hidden className="absolute bottom-3 left-[1.35rem] top-3 w-px bg-sand" />
            <motion.span
              aria-hidden
              style={{ scaleY: reduce ? 1 : p }}
              className="absolute bottom-3 left-[1.35rem] top-3 w-px origin-top bg-walnut"
            />
            {steps.map((s, i) => (
              <Step key={s.title} i={i} title={s.title} body={s.body} progress={p} still={!!reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
