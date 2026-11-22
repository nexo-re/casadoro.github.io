import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { services, type Service } from '../lib/data';
import { ArrowLink, EASE, Eyebrow, pad, Reveal } from './ui';

function Row({
  s,
  i,
  added,
  onToggle,
}: {
  s: Service;
  i: number;
  added: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative"
    >
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-sand"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 1.3, ease: EASE }}
      />
      <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 py-7 md:py-8 lg:grid-cols-[3.5rem_minmax(0,1.05fr)_minmax(0,1fr)_auto] lg:gap-x-10">
        <span className="num self-start pt-2 text-umber lg:self-center lg:pt-0">{pad(i + 1)}</span>
        <h3 className="display text-[clamp(1.7rem,3.1vw,2.7rem)] transition-transform duration-500 ease-out lg:group-hover:translate-x-2">
          {s.name}
        </h3>
        <p className="col-start-2 max-w-[34rem] text-umber lg:col-start-auto">{s.blurb}</p>
        <div className="col-start-2 flex items-center gap-5 lg:col-start-auto lg:justify-end">
          <div className="h-24 w-[4.5rem] shrink-0 overflow-hidden rounded-[3px] bg-linen md:h-28 md:w-[5.25rem]">
            <img
              src={s.img}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: s.pos }}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={added}
            aria-label={added ? `Remove ${s.name} from your brief` : `Add ${s.name} to your brief`}
            className={`inline-flex min-h-11 w-[9.75rem] items-center justify-center gap-2 rounded-full border text-[0.88rem] font-medium transition-colors duration-300 ${
              added
                ? 'border-walnut bg-walnut text-paper'
                : 'border-walnut/30 text-walnut hover:border-walnut hover:bg-walnut/5'
            }`}
          >
            {added ? <Check size={15} strokeWidth={2} /> : <Plus size={15} strokeWidth={2} />}
            {added ? 'In your brief' : 'Add to brief'}
          </button>
        </div>
      </div>
    </motion.li>
  );
}

export function Services({
  spaces,
  toggleSpace,
}: {
  spaces: string[];
  toggleSpace: (id: string) => void;
}) {
  const picked = services.filter((s) => spaces.includes(s.id)).length;

  return (
    <section id="services" className="relative scroll-mt-16 py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>What we build</Eyebrow>
            <h2 className="display mt-7 text-[clamp(2.4rem,5.4vw,5rem)]">
              Take one room,
              <br />
              <em>or the whole home.</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="max-w-[30rem] text-[1.1rem] text-umber">
              Each piece is measured, made and fitted for the room it’s going into. Add what you need
              to your brief as you go — it’ll be waiting in the form below.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-b border-sand md:mt-20">
          {services.map((s, i) => (
            <Row key={s.id} s={s} i={i} added={spaces.includes(s.id)} onToggle={() => toggleSpace(s.id)} />
          ))}
        </ul>

        <div className="flex min-h-24 items-center pt-8">
          <AnimatePresence mode="wait" initial={false}>
            {picked > 0 ? (
              <motion.div
                key="picked"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-wrap items-center gap-x-6 gap-y-4"
              >
                <p className="text-umber" aria-live="polite">
                  <span className="font-medium text-walnut">
                    {picked} {picked === 1 ? 'item' : 'items'}
                  </span>{' '}
                  in your brief.
                </p>
                <ArrowLink href="#brief">Finish my brief</ArrowLink>
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-umber"
              >
                Not sure what you need yet?{' '}
                <a href="#brief" className="font-medium text-walnut underline decoration-tan decoration-1 underline-offset-4 hover:decoration-walnut">
                  Describe the space instead
                </a>
                .
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
