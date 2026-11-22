import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../lib/data';
import { EASE, Eyebrow, Reveal } from './ui';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-16 border-t border-sand bg-linen/50 py-24 md:py-32">
      <div className="shell grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Before you ask</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2.4rem,5vw,4.5rem)]">
            Quick <em>answers.</em>
          </h2>
        </Reveal>

        <div className="lg:col-span-7">
          <ul className="border-b border-sand">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-t border-sand">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="display text-[clamp(1.35rem,2.1vw,1.75rem)] leading-tight">{f.q}</span>
                      <span
                        aria-hidden
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ${
                          isOpen ? 'rotate-45 border-walnut bg-walnut text-paper' : 'border-walnut/30 text-walnut'
                        }`}
                      >
                        <Plus size={16} strokeWidth={1.75} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[38rem] pb-7 pr-12 text-umber">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
