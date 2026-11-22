import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const rowA = ['Complete interiors', 'Custom sofas', 'Wooden work', 'Dining tables', 'Modular kitchens'];
const rowB = ['Partitions', 'Wallpaper', 'White wash', 'False ceilings', 'Cove lighting'];

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="flex w-max items-center">
      {loop.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`display px-[0.35em] text-[clamp(2.6rem,7.5vw,7rem)] leading-[1.15] whitespace-nowrap ${
              outline ? 'text-outline italic' : 'text-walnut'
            }`}
          >
            {t}
          </span>
          <span aria-hidden className="flute h-[clamp(1.4rem,3.4vw,3rem)] w-[clamp(2.6rem,6vw,5.5rem)] rounded-full" />
        </span>
      ))}
    </div>
  );
}

/** Two bands of craft names that slide against each other with the scroll. */
export function CraftMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const xA = useTransform(p, [0, 1], ['-4%', '-34%']);
  const xB = useTransform(p, [0, 1], ['-36%', '-6%']);

  return (
    <div ref={ref} aria-hidden className="overflow-x-clip border-y border-sand bg-linen/60 py-8 md:py-12">
      <motion.div style={{ x: reduce ? '-4%' : xA }}>
        <Row items={rowA} />
      </motion.div>
      <motion.div style={{ x: reduce ? '-20%' : xB }} className="mt-1 md:mt-2">
        <Row items={rowB} outline />
      </motion.div>
    </div>
  );
}
