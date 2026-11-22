import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const pad = (n: number) => String(n).padStart(2, '0');

export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === 'dark' ? 'text-umber' : 'text-glow'}`}>
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}

type Variant = 'tan' | 'cream' | 'outline-light' | 'outline-dark';

const shells: Record<Variant, string> = {
  tan: 'bg-tan text-soot hover:bg-walnut hover:text-paper',
  cream: 'bg-paper text-soot hover:bg-glow',
  'outline-light': 'border border-paper/45 text-paper hover:border-paper hover:bg-paper/10',
  'outline-dark': 'border border-walnut/30 text-walnut hover:border-walnut hover:bg-walnut/5',
};

const dots: Record<Variant, string> = {
  tan: 'bg-walnut text-paper group-hover:bg-glow group-hover:text-soot',
  cream: 'bg-walnut text-paper',
  'outline-light': 'bg-paper/15 text-paper',
  'outline-dark': 'bg-walnut/10 text-walnut',
};

export function ArrowLink({
  href,
  children,
  variant = 'tan',
  external = false,
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300 ${shells[variant]} ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${dots[variant]}`}
      >
        <Icon
          size={16}
          strokeWidth={1.75}
          className={`transition-transform duration-300 ${external ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
        />
      </span>
    </a>
  );
}

export function InstagramIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Image that drifts inside its frame as the page scrolls past it. */
export function ParallaxImage({
  src,
  alt,
  className = '',
  pos = '50% 50%',
  amount = 7,
}: {
  src: string;
  alt: string;
  className?: string;
  pos?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduce ? { objectPosition: pos } : { y, scale: 1 + amount / 40, objectPosition: pos }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
