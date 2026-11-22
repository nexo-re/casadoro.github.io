import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BRAND, EMAIL, HANDLE, INSTAGRAM_URL, PHONE, PHONE_HREF } from '../lib/data';
import { ArrowLink, InstagramIcon } from './ui';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'Questions' },
  { href: '#brief', label: 'Start a brief' },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['38%', '0%']);
  const opacity = useTransform(scrollYProgress, [0.2, 1], [0.15, 1]);

  return (
    <footer ref={ref} className="on-dark relative overflow-hidden bg-walnut text-paper">
      <div aria-hidden className="flute-dark h-5" />
      <div className="shell pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="display max-w-[30rem] text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08]">
              New designs and finished rooms, <em>posted as they happen.</em>
            </p>
            <ArrowLink href={INSTAGRAM_URL} external variant="outline-light" className="mt-7">
              <span className="flex items-center gap-2.5">
                <InstagramIcon size={17} /> {HANDLE}
              </span>
            </ArrowLink>
          </div>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-8">
            <p className="eyebrow text-sand/80">On this page</p>
            <ul className="mt-5 space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-10 items-center text-paper/90 underline-offset-4 hover:text-glow hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="eyebrow text-sand/80">Enquiries</p>
            <ul className="mt-5 space-y-1">
              <li>
                <a href={PHONE_HREF} className="inline-flex min-h-10 items-center text-paper/90 underline-offset-4 hover:text-glow hover:underline">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-10 items-center break-all text-paper/90 underline-offset-4 hover:text-glow hover:underline">
                  {EMAIL}
                </a>
              </li>
              <li className="pt-1 text-[0.92rem] text-sand/85">Or send the brief on this page.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden md:mt-24">
          <motion.p
            aria-hidden
            style={reduce ? undefined : { y, opacity }}
            className="display text-center text-[clamp(2.2rem,10vw,11rem)] leading-[0.9] whitespace-nowrap text-tan"
          >
            <em>Casa</em>Doro Interiors
          </motion.p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/15 pt-6 text-[0.88rem] text-sand/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND}. Project photography is our own work.</p>
          <a href="#top" className="inline-flex min-h-10 items-center underline-offset-4 hover:text-glow hover:underline">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
