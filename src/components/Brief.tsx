import { useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { BRAND, FULL_HOME, HANDLE, INSTAGRAM_DM, INSTAGRAM_URL, PHONE, PHONE_HREF, services } from '../lib/data';
import { ArrowLink, Eyebrow, Reveal } from './ui';

const SPACE_OPTIONS = [...services.map((s) => ({ id: s.id, chip: s.chip })), FULL_HOME];
const PROPERTY = ['Apartment', 'Independent house', 'Office or shop'];
const STAGE = ['New possession', 'Renovating', 'Under construction'];
const TIMELINE = ['As soon as possible', 'In 1–3 months', 'Just exploring'];

/** Synchronous copy, so the Instagram tab can be opened inside the same click. */
function copySync(text: string) {
  const active = document.activeElement as HTMLElement | null;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.setAttribute('aria-hidden', 'true');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    ta.style.fontSize = '16px';
    document.body.appendChild(ta);
    ta.focus({ preventScroll: true });
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  } finally {
    active?.focus({ preventScroll: true });
  }
}

async function copyAsync(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Recessed downlight that switches on as the section scrolls into view. */
function Downlight({ i, progress, still }: { i: number; progress: MotionValue<number>; still: boolean }) {
  const on = useTransform(progress, [0.22 + i * 0.09, 0.36 + i * 0.09], [0, 1]);
  return (
    <div className="absolute top-[6.5rem]" style={{ left: `${14 + i * 18}%` }}>
      <span className="absolute -left-[5px] top-0 h-[5px] w-[10px] rounded-b-full bg-[#120c08]" />
      <motion.span
        style={{ opacity: still ? 1 : on }}
        className="absolute -left-[4px] top-0 h-[4px] w-[8px] rounded-b-full bg-glow shadow-[0_0_14px_4px_rgba(245,201,138,0.7)]"
      />
      <motion.div style={{ opacity: still ? 1 : on }} className="absolute -left-28 top-1 h-72 w-56 blur-xl">
        <div className="h-full w-full bg-[linear-gradient(180deg,rgba(245,201,138,0.3),rgba(245,201,138,0.06)_60%,transparent)] [clip-path:polygon(47%_0,53%_0,100%_100%,0_100%)]" />
      </motion.div>
    </div>
  );
}

/** A tray ceiling with cove light — the warm lighting detail that finishes a CasaDoro room. */
function Cove({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  const glow = useTransform(progress, [0, 0.55], [0, 1]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] overflow-hidden">
      <motion.div
        style={{ opacity: still ? 1 : glow }}
        className="absolute inset-x-0 top-[6.5rem] h-[25rem] bg-[radial-gradient(62%_85%_at_50%_0%,rgba(245,201,138,0.34),rgba(245,201,138,0.09)_48%,transparent_78%)]"
      />
      <div className="absolute inset-x-[7%] top-0 h-[6.5rem] rounded-b-[5px] bg-[#231810]" />
      <motion.div
        style={{ opacity: still ? 1 : glow }}
        className="absolute inset-x-[7%] top-[6.5rem] h-[3px] bg-glow shadow-[0_0_28px_8px_rgba(245,201,138,0.5)]"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <Downlight key={i} i={i} progress={progress} still={still} />
      ))}
    </div>
  );
}

function Group({
  legend,
  hint,
  error,
  errorId,
  children,
}: {
  legend: string;
  hint?: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="flex w-full items-baseline justify-between gap-4">
        <span className="display text-[1.5rem] text-paper">{legend}</span>
        {hint && <span className="text-[0.85rem] text-sand/80">{hint}</span>}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2.5">{children}</div>
      {error && (
        <p id={errorId} role="alert" className="mt-3 text-[0.92rem] font-medium text-glow">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Chip({
  type,
  name,
  label,
  checked,
  onChange,
  inputRef,
}: {
  type: 'checkbox' | 'radio';
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <label className="cursor-pointer">
      <input
        ref={inputRef}
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        onClick={type === 'radio' && checked ? onChange : undefined}
        className="peer sr-only"
      />
      <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/25 px-4 text-[0.93rem] text-paper/90 transition-colors duration-200 hover:border-paper/60 peer-checked:border-glow peer-checked:bg-glow peer-checked:font-medium peer-checked:text-soot peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-glow">
        {checked && <Check size={14} strokeWidth={2.25} aria-hidden />}
        {label}
      </span>
    </label>
  );
}

const fieldClass =
  'mt-2 block w-full rounded-none border-0 border-b border-paper/30 bg-transparent px-0 py-2.5 text-[1.05rem] text-paper placeholder:text-sand/50 transition-colors focus:border-glow focus:outline-none';

export function Brief({
  spaces,
  toggleSpace,
}: {
  spaces: string[];
  toggleSpace: (id: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const firstSpace = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.1'] });

  const [property, setProperty] = useState('');
  const [stage, setStage] = useState('');
  const [timeline, setTimeline] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ spaces?: string; name?: string }>({});
  const [copied, setCopied] = useState<{ msg: string; ok: boolean } | null>(null);

  const picked = SPACE_OPTIONS.filter((o) => spaces.includes(o.id)).map((o) => o.chip);

  const lines = useMemo(
    () =>
      [
        ['Name', name.trim()],
        ['Spaces', picked.join(', ')],
        ['Property', property],
        ['Stage', stage],
        ['Timeline', timeline],
        ['Area', area.trim()],
        ['Phone', phone.trim()],
        ['Notes', notes.trim()],
      ] as [string, string][],
    [name, picked, property, stage, timeline, area, phone, notes],
  );

  const message = useMemo(
    () =>
      [`Hi ${BRAND}, I’d like to plan an interior.`, '', ...lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n'),
    [lines],
  );

  const ready = copied !== null && copied.msg === message;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (picked.length === 0) next.spaces = 'Pick at least one, so we know what to quote for.';
    if (!name.trim()) next.name = 'Add your name so we know who we’re replying to.';
    setErrors(next);
    if (next.spaces) {
      firstSpace.current?.focus();
      return;
    }
    if (next.name) {
      nameInput.current?.focus();
      return;
    }
    if (copySync(message)) {
      setCopied({ msg: message, ok: true });
      window.open(INSTAGRAM_DM, '_blank', 'noopener,noreferrer');
      return;
    }
    const ok = await copyAsync(message);
    setCopied({ msg: message, ok });
  };

  const recopy = async () => {
    const ok = copySync(message) || (await copyAsync(message));
    setCopied({ msg: message, ok });
  };

  return (
    <section id="brief" ref={ref} className="on-dark relative scroll-mt-0 overflow-hidden bg-walnut text-paper">
      <Cove progress={scrollYProgress} still={!!reduce} />

      <div className="shell relative pb-24 pt-48 md:pb-32 md:pt-56">
        <Reveal className="max-w-[52rem]">
          <Eyebrow tone="light">Start your project</Eyebrow>
          <h2 className="display mt-7 text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.98]">
            Tell us about
            <br />
            <em>your space.</em>
          </h2>
          <p className="mt-6 max-w-[34rem] text-[1.1rem] text-sand">
            Two minutes, no sign-up. Your answers become a ready-to-send message for our Instagram
            inbox, and we reply there to set up a site visit.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-14 lg:mt-20 lg:grid-cols-12">
          <form id="brief-form" noValidate onSubmit={onSubmit} className="space-y-11 lg:col-span-7">
            <Group
              legend="What are we building?"
              hint="Choose any"
              error={errors.spaces}
              errorId="err-spaces"
            >
              {SPACE_OPTIONS.map((o, i) => (
                <Chip
                  key={o.id}
                  type="checkbox"
                  name="spaces"
                  label={o.chip}
                  checked={spaces.includes(o.id)}
                  inputRef={i === 0 ? firstSpace : undefined}
                  onChange={() => {
                    toggleSpace(o.id);
                    if (errors.spaces) setErrors((er) => ({ ...er, spaces: undefined }));
                  }}
                />
              ))}
            </Group>

            <Group legend="What kind of property?" hint="Optional">
              {PROPERTY.map((o) => (
                <Chip key={o} type="radio" name="property" label={o} checked={property === o} onChange={() => setProperty(property === o ? '' : o)} />
              ))}
            </Group>

            <Group legend="Where is it at?" hint="Optional">
              {STAGE.map((o) => (
                <Chip key={o} type="radio" name="stage" label={o} checked={stage === o} onChange={() => setStage(stage === o ? '' : o)} />
              ))}
            </Group>

            <Group legend="When do you want to start?" hint="Optional">
              {TIMELINE.map((o) => (
                <Chip key={o} type="radio" name="timeline" label={o} checked={timeline === o} onChange={() => setTimeline(timeline === o ? '' : o)} />
              ))}
            </Group>

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                <label htmlFor="brief-name" className="eyebrow text-sand">
                  Your name
                </label>
                <input
                  ref={nameInput}
                  id="brief-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={fieldClass}
                />
                {errors.name && (
                  <p id="err-name" role="alert" className="mt-2 text-[0.92rem] font-medium text-glow">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="brief-phone" className="eyebrow text-sand">
                  Phone <span className="tracking-normal normal-case text-sand/70">(optional)</span>
                </label>
                <input
                  id="brief-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="brief-area" className="eyebrow text-sand">
                  City or locality <span className="tracking-normal normal-case text-sand/70">(optional)</span>
                </label>
                <input
                  id="brief-area"
                  name="area"
                  type="text"
                  autoComplete="address-level2"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="brief-notes" className="eyebrow text-sand">
                  Anything else? <span className="tracking-normal normal-case text-sand/70">(optional)</span>
                </label>
                <textarea
                  id="brief-notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Room sizes, a style or fabric colour you like, things that annoy you about the current layout…"
                  className={`${fieldClass} resize-y`}
                />
              </div>
            </div>
          </form>

          <aside className="lg:col-span-5" aria-label="Your brief">
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-[4px] bg-paper p-6 text-walnut shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] md:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-sand pb-5">
                  <div>
                    <p className="eyebrow text-umber">Your brief</p>
                    <p className="display mt-2 text-[1.7rem]">
                      To <em>{BRAND}</em>
                    </p>
                  </div>
                  <span aria-hidden className="flute mt-1 h-12 w-12 shrink-0 rounded-full" />
                </div>
                <dl className="divide-y divide-sand/70">
                  {lines.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 py-3 text-[0.95rem]">
                      <dt className="eyebrow pt-1 text-[0.68rem] text-umber">{k}</dt>
                      <dd className={`break-words whitespace-pre-line ${v ? 'text-walnut' : 'text-umber/60'}`}>{v || '—'}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6" aria-live="polite">
                {ready && copied.ok ? (
                  <div className="rounded-[4px] border border-glow/40 bg-glow/10 p-5">
                    <p className="flex items-center gap-2.5 font-medium text-glow">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-glow text-soot">
                        <Check size={14} strokeWidth={2.5} aria-hidden />
                      </span>
                      Brief copied to your clipboard
                    </p>
                    <p className="mt-3 text-[0.98rem] text-sand">
                      Paste it into the chat with {HANDLE} and press send. If Instagram didn’t open
                      in a new tab, use the button below.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <ArrowLink href={INSTAGRAM_DM} external variant="cream">
                        Open Instagram Direct
                      </ArrowLink>
                      <button
                        type="button"
                        onClick={recopy}
                        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/35 px-5 text-[0.95rem] font-medium text-paper transition-colors hover:border-paper hover:bg-paper/10"
                      >
                        <Copy size={15} strokeWidth={1.75} aria-hidden /> Copy again
                      </button>
                    </div>
                    <p className="mt-4 text-[0.9rem] text-sand/85">
                      Chat link not opening?{' '}
                      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-glow/60 underline-offset-4 hover:decoration-glow">
                        Message us from our profile
                      </a>
                      .
                    </p>
                  </div>
                ) : ready ? (
                  <div className="rounded-[4px] border border-glow/40 bg-glow/10 p-5">
                    <p className="font-medium text-glow">Your browser blocked the automatic copy</p>
                    <p className="mt-2 text-[0.98rem] text-sand">
                      Select the text below, copy it, then paste it into our Instagram chat.
                    </p>
                    <textarea
                      readOnly
                      rows={7}
                      value={message}
                      onFocus={(e) => e.currentTarget.select()}
                      aria-label="Your brief as text"
                      className="mt-4 block w-full rounded-[3px] border border-paper/25 bg-soot/60 p-3 text-[0.92rem] text-paper"
                    />
                    <ArrowLink href={INSTAGRAM_DM} external variant="cream" className="mt-4">
                      Open Instagram Direct
                    </ArrowLink>
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      form="brief-form"
                      className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-glow py-2 pl-7 pr-2 text-left text-[1rem] font-medium text-soot transition-colors duration-300 hover:bg-paper"
                    >
                      Copy brief &amp; open Instagram
                      <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-walnut text-paper">
                        <Copy size={16} strokeWidth={1.75} />
                      </span>
                    </button>
                    <p className="mt-4 text-[0.9rem] leading-relaxed text-sand/85">
                      Nothing is sent from this page. The brief is copied to your clipboard and
                      Instagram Direct opens in a new tab — paste, send, and we’ll reply there.
                    </p>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-sand/85">
                      Prefer to talk?{' '}
                      <a href={PHONE_HREF} className="text-paper underline decoration-glow/60 underline-offset-4 hover:decoration-glow">
                        Call {PHONE}
                      </a>
                      .
                    </p>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
