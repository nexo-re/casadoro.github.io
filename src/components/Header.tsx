import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { HANDLE, INSTAGRAM_URL } from '../lib/data';
import { ArrowLink, EASE, InstagramIcon } from './ui';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'Questions' },
];

export function Header({ briefCount }: { briefCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onWide = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ${
          solid
            ? 'border-sand/80 bg-cream/90 text-walnut backdrop-blur-md'
            : 'border-transparent bg-transparent text-paper'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3" aria-label="CasaDoro Interiors, back to top" onClick={() => setOpen(false)}>
            <span className="font-display text-[1.9rem] leading-none italic tracking-tight">CD</span>
            <span aria-hidden className="h-7 w-px bg-current opacity-30" />
            <span className="eyebrow leading-[1.35] tracking-[0.24em]">
              Casadoro
              <br />
              Interiors
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-2 text-[0.95rem] font-medium"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#brief"
              onClick={() => setOpen(false)}
              className={`hidden min-h-11 items-center gap-2 rounded-full px-5 text-[0.92rem] font-medium transition-colors duration-300 sm:inline-flex ${
                solid
                  ? 'bg-walnut text-paper hover:bg-camel'
                  : 'bg-paper text-soot hover:bg-glow'
              }`}
            >
              Plan my interior
              {briefCount > 0 && (
                <span className="num grid h-5 min-w-5 place-items-center rounded-full bg-glow px-1 text-[0.7rem] text-soot">
                  {briefCount}
                </span>
              )}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream px-5 pb-8 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.06 * i + 0.05, ease: EASE }}
                  className="display flex items-baseline justify-between border-b border-sand py-5 text-[2.4rem]"
                >
                  {l.label}
                  <span className="num text-umber">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <ArrowLink href="#brief" onClick={() => setOpen(false)} className="justify-between">
                Plan my interior
              </ArrowLink>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-3 px-1 text-[0.95rem] font-medium text-umber"
              >
                <InstagramIcon /> {HANDLE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
