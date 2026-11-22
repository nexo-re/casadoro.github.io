import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { BRAND, HANDLE, INSTAGRAM_URL } from '../lib/data';
import { EASE, Eyebrow, InstagramIcon, ParallaxImage, Reveal } from './ui';

// words wrapped in *asterisks* are set in italic
const STATEMENT =
  'We make the parts of a home you live with every day — the sofa that holds its shape, the wooden unit that fits the corner, the partition that lets light *through* and still *divides* the room.';

const principles = [
  {
    title: 'One team, start to finish',
    body: 'Design, furniture, woodwork, painting and wallpaper are handled by us, so you aren’t coordinating five different people.',
  },
  {
    title: 'Made to measure',
    body: 'Sofas, storage and tables are built to your room and the way you use it, not to a catalogue size that almost fits.',
  },
  {
    title: 'Affordable, agreed upfront',
    body: 'Good interiors shouldn’t cost a fortune. We talk through budget and materials first, and the quote follows what was agreed.',
  },
];

function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const italic = word.startsWith('*');
  const text = word.replace(/\*/g, '');
  return (
    <motion.span style={{ opacity: still ? 1 : opacity }} className="mr-[0.24em] inline-block">
      {italic ? <em>{text}</em> : text}
    </motion.span>
  );
}

export function Intro() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const picsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.88', 'end 0.5'] });
  const { scrollYProgress: pics } = useScroll({ target: picsRef, offset: ['start end', 'end start'] });
  const backY = useTransform(pics, [0, 1], [70, -70]);
  const smallY = useTransform(pics, [0, 1], [110, -90]);
  const words = STATEMENT.split(' ');

  return (
    <section id="intro" className="relative scroll-mt-16 overflow-x-clip pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="shell grid gap-x-12 gap-y-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>{BRAND}</Eyebrow>
          <p
            ref={textRef}
            className="display mt-8 text-[clamp(1.85rem,3.9vw,3.6rem)] leading-[1.12] [text-wrap:initial]"
          >
            {words.map((w, i) => (
              <Word
                key={i}
                word={w}
                progress={scrollYProgress}
                range={[i / words.length, Math.min(1, (i + 3) / words.length)]}
                still={!!reduce}
              />
            ))}
          </p>

          <Reveal className="mt-10">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 text-[0.98rem] font-medium text-umber transition-colors hover:text-walnut"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-sand transition-colors group-hover:border-walnut">
                <InstagramIcon />
              </span>
              <span>
                New designs and finished rooms on{' '}
                <span className="text-walnut underline decoration-tan decoration-1 underline-offset-4">{HANDLE}</span>
              </span>
            </a>
          </Reveal>
        </div>

        <div ref={picsRef} className="relative mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
          <motion.div
            aria-hidden
            style={reduce ? undefined : { y: backY }}
            className="flute absolute -right-5 -top-8 h-[72%] w-[62%] rounded-[4px] md:-right-10"
          />
          <motion.div
            className="relative ml-auto w-[80%]"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <ParallaxImage
              src="/work/living-partition.jpg"
              alt="Living room by CasaDoro Interiors with a brass-finish slatted partition and a warm cove-lit ceiling"
              pos="62% 50%"
              className="aspect-[3/4] rounded-[4px]"
            />
          </motion.div>
          <motion.div
            style={reduce ? undefined : { y: smallY }}
            className="absolute -bottom-10 left-0 w-[46%] rounded-[4px] border-[6px] border-cream shadow-[0_30px_60px_-30px_rgba(47,33,24,0.45)]"
          >
            <img
              src="/work/pantry-counter.jpg"
              alt="Pantry counter by CasaDoro Interiors with wood-finish drawers and warm LED strips"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[2px] object-cover"
            />
          </motion.div>
        </div>
      </div>

      <div className="shell mt-28 grid gap-10 md:mt-40 md:grid-cols-3 md:gap-8">
        {principles.map((p, i) => (
          <div key={p.title} className="relative pt-7">
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left bg-walnut/70"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: EASE }}
            />
            <Reveal delay={0.1 + i * 0.12}>
              <h3 className="display text-[1.75rem] md:text-[2rem]">{p.title}</h3>
              <p className="mt-4 max-w-[26rem] text-umber">{p.body}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
