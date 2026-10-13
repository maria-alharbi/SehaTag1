import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Nfc, TriangleAlert, Phone, Printer, Copy, Check, ChevronDown, Menu, X, ArrowUp,
  Droplet, Pill, ShieldAlert, Syringe, Activity, HeartPulse, Wind, Thermometer,
  FlaskConical, Stethoscope, Leaf, Utensils, Globe, Siren, Info, CalendarDays,
  Cpu, Accessibility, Users, Scissors, Hospital, ClipboardList, Droplets, FileText,
} from 'lucide-react'
import Logo from './Logo.jsx'
import { LANGS, STR } from './i18n.js'
import { PATIENT, EMERGENCY, ALLERGIES, MEDS, HISTORY, HEALTH } from './data.js'

const NAV = [
  ['emergency', 'navEmergency'],
  ['profile', 'navProfile'],
  ['allergies', 'navAllergies'],
  ['medications', 'navMeds'],
  ['history', 'navHistory'],
  ['health', 'navHealth'],
]

const HISTORY_ICONS = {
  chronic: Activity, previous: ClipboardList, surgeries: Scissors, hospitalizations: Hospital,
  family: Users, devices: Cpu, special: Accessibility,
}
const VITAL_ICONS = { bp: HeartPulse, hr: Activity, spo2: Wind, temp: Thermometer, glucose: Droplets }
const ALLERGY_ICONS = { med: Pill, food: Utensils, env: Leaf }
const ALLERGY_TITLES = { med: 'medAllergies', food: 'foodAllergies', env: 'envAllergies' }

function getInitialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (LANGS.some((l) => l.code === q)) return q
    const saved = window.localStorage.getItem('sehatag-lang')
    if (LANGS.some((l) => l.code === saved)) return saved
  } catch {}
  return 'ar'
}

/* ------------------------------ Splash ------------------------------ */
function Splash({ t, onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 2300)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-brand-tint to-white px-6 text-center">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <span className="ring absolute h-40 w-40 rounded-full border-2 border-brand/50" />
        <span className="ring d1 absolute h-40 w-40 rounded-full border-2 border-brand/40" />
        <span className="ring d2 absolute h-40 w-40 rounded-full border-2 border-brand/30" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-card">
          <Logo size={84} animated />
        </div>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-dark">
        SehaTag <span className="font-bold text-brand">| صحة تاق</span>
      </h1>
      <p className="mt-1 text-sm font-semibold text-slate-500" dir="auto">{t('tagline')}</p>
      <div className="mt-8 flex items-center gap-2 text-brand-dark">
        <Nfc size={20} className="animate-pulse" aria-hidden />
        <p className="text-sm font-semibold sm:text-base" role="status">{t('connecting')}</p>
      </div>
      <div className="mt-4 h-1.5 w-64 max-w-full overflow-hidden rounded-full bg-brand-soft" aria-hidden>
        <div className="progress-bar h-full w-full rounded-full bg-brand" />
      </div>
      <p className="mt-3 max-w-xs text-xs text-slate-400">{t('simNote')}</p>
      <button
        onClick={onDone}
        className="mt-8 rounded-full border border-brand/30 px-5 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-soft"
      >
        {t('skip')}
      </button>
    </div>
  )
}

/* ----------------------------- Small parts ----------------------------- */
function Section({ id, icon: Icon, title, children, tone = 'brand' }) {
  return (
    <section id={id} className="scroll-mt-28 fade-up">
      <h2 className={`mb-4 flex items-center gap-2 text-xl font-extrabold ${tone === 'danger' ? 'text-danger' : 'text-brand-dark'}`}>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === 'danger' ? 'bg-danger-soft text-danger' : 'bg-brand-soft text-brand-dark'}`}>
          <Icon size={20} aria-hidden />
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Field({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-bold text-slate-800" dir="auto">{children}</dd>
    </div>
  )
}

function SeverityBadge({ level, t }) {
  const styles = {
    severe: 'bg-danger text-white',
    moderate: 'bg-amber-100 text-amber-800',
    mild: 'bg-brand-soft text-brand-dark',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[level]}`}>
      {level === 'severe' && <TriangleAlert size={12} aria-hidden />}
      {t(level)}
    </span>
  )
}

function Accordion({ title, icon: Icon, open, onToggle, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-soft bg-white shadow-card">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-start"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
          <Icon size={18} aria-hidden />
        </span>
        <span className="flex-1 font-bold text-slate-800">{title}</span>
        <ChevronDown size={20} aria-hidden className={`shrink-0 text-brand transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-brand-soft px-4 py-3.5">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Avatar() {
  return (
    <svg viewBox="0 0 96 96" className="h-24 w-24 shrink-0 rounded-full ring-4 ring-brand-soft" role="img" aria-label="Patient avatar">
      <defs>
        <linearGradient id="av" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D9F2E9" />
          <stop offset="1" stopColor="#8FD5BC" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" fill="url(#av)" />
      <circle cx="48" cy="38" r="17" fill="#006B50" />
      <path d="M14 96c2-22 16-34 34-34s32 12 34 34z" fill="#008F68" />
    </svg>
  )
}

/* -------------------------------- App -------------------------------- */
export default function App() {
  const [lang, setLang] = useState(getInitialLang)
  const [splash, setSplash] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [toast, setToast] = useState('')
  const [open, setOpen] = useState(() => new Set(['chronic']))

  const meta = LANGS.find((l) => l.code === lang)
  const t = useCallback((k) => STR[lang][k] ?? STR.en[k] ?? k, [lang])
  const l = useCallback((o) => (typeof o === 'string' ? o : o[lang] ?? o.en), [lang])

  const fmt = useCallback(
    (d) => new Intl.DateTimeFormat(meta.locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(d + 'T00:00:00')),
    [meta]
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir
    document.title = 'SehaTag | صحة تاق'
    try { window.localStorage.setItem('sehatag-lang', lang) } catch {}
  }, [lang, meta])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const age = useMemo(() => {
    const b = new Date(PATIENT.dob), n = new Date()
    let a = n.getFullYear() - b.getFullYear()
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a--
    return a
  }, [])

  const allKeys = useMemo(() => [...HISTORY.map((h) => h.key), 'vaccines', 'labs', 'notes'], [])
  const allOpen = open.size === allKeys.length
  const toggle = (k) => setOpen((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n })
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(allKeys))

  const copyId = async () => {
    try { await navigator.clipboard.writeText(PATIENT.id) } catch {}
    setToast(t('copied'))
  }

  const grouped = ['med', 'food', 'env'].map((type) => ({ type, items: ALLERGIES.filter((a) => a.type === type) }))

  return (
    <div className={lang === 'ur' ? 'font-urdu' : 'font-sans'}>
      {splash && <Splash t={t} onDone={() => setSplash(false)} />}

      {/* Demo strip */}
      <div className="bg-amber-100 px-3 py-1.5 text-center text-xs font-bold text-amber-900 print:hidden">
        {t('demoBadge')}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-brand-soft bg-white/90 backdrop-blur print:static">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2" aria-label="SehaTag">
            <Logo size={36} />
            <span className="text-lg font-extrabold leading-none text-brand-dark">
              SehaTag<span className="hidden text-brand sm:inline"> | صحة تاق</span>
            </span>
          </a>

          <nav className="ms-4 hidden flex-1 items-center gap-1 md:flex print:hidden" aria-label="Main">
            {NAV.map(([id, key]) => (
              <a key={id} href={`#${id}`} className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition hover:bg-brand-tint ${id === 'emergency' ? 'text-danger' : 'text-slate-600 hover:text-brand-dark'}`}>
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2 print:hidden">
            <label className="flex items-center gap-1 rounded-lg border border-brand-soft bg-white px-2 py-1 text-sm font-semibold text-brand-dark">
              <Globe size={16} aria-hidden />
              <span className="sr-only">{t('language')}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent py-0.5 text-sm font-semibold focus:outline-none"
                aria-label={t('language')}
              >
                {LANGS.map((x) => <option key={x.code} value={x.code}>{x.label}</option>)}
              </select>
            </label>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg border border-brand-soft p-2 text-brand-dark md:hidden"
              aria-label={t('menu')}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-brand-soft bg-white px-4 py-2 md:hidden print:hidden" aria-label="Mobile">
            {NAV.map(([id, key]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className={`block rounded-lg px-3 py-2.5 text-sm font-bold ${id === 'emergency' ? 'text-danger' : 'text-slate-700'} active:bg-brand-tint`}>
                {t(key)}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="mx-auto max-w-5xl space-y-10 px-4 pb-28 pt-6">
        {/* Emergency */}
        <Section id="emergency" icon={Siren} title={t('titleEmergency')} tone="danger">
          <div className="overflow-hidden rounded-3xl border-2 border-danger-border bg-danger-soft shadow-card">
            <div className="flex flex-wrap items-center gap-4 border-b border-danger-border bg-white/60 p-4">
              <div className="pulse-red flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-danger text-white">
                <Droplet size={16} aria-hidden />
                <span className="text-2xl font-extrabold leading-tight" dir="ltr">{PATIENT.bloodType}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-danger">{t('bloodType')}</p>
                <p className="text-lg font-extrabold text-slate-900" dir="auto">{l(PATIENT.name)}</p>
                <p className="text-xs text-slate-500">{t('patientId')}: <span dir="ltr" className="font-mono font-semibold">{PATIENT.id}</span></p>
              </div>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-2">
              <EmBlock icon={ShieldAlert} title={t('severeAllergies')} items={EMERGENCY.allergies.map(l)} critical />
              <EmBlock icon={TriangleAlert} title={t('criticalConditions')} items={EMERGENCY.conditions.map(l)} critical />
              <EmBlock icon={Pill} title={t('importantMeds')} items={EMERGENCY.medications.map(l)} />
              <div className="rounded-2xl bg-white p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-800"><Phone size={16} className="text-danger" aria-hidden />{t('emergencyContact')}</h3>
                <dl className="grid grid-cols-2 gap-3">
                  <Field label={t('fullName')}>{l(EMERGENCY.contact.name)}</Field>
                  <Field label={t('relation')}>{l(EMERGENCY.contact.relation)}</Field>
                  <Field label={t('phone')}><span dir="ltr">{EMERGENCY.contact.phone}</span></Field>
                </dl>
                <button onClick={() => setToast(t('callToast'))} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-danger px-4 py-2 text-sm font-bold text-white transition active:scale-95">
                  <Phone size={16} aria-hidden />{t('callDemo')}
                </button>
              </div>
            </div>

            <div className="m-4 mt-0 rounded-2xl border border-danger-border bg-white p-4">
              <h3 className="mb-1.5 flex items-center gap-2 text-sm font-extrabold text-danger"><TriangleAlert size={16} aria-hidden />{t('instructions')}</h3>
              <p className="text-sm font-semibold leading-relaxed text-slate-800" dir="auto">{l(EMERGENCY.instructions)}</p>
            </div>
          </div>
        </Section>

        {/* Profile */}
        <Section id="profile" icon={FileText} title={t('titleProfile')}>
          <div className="rounded-3xl border border-brand-soft bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar />
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-bold text-brand-dark">{t('digitalCard')} · {t('fictional')}</span>
                <p className="mt-1 text-xl font-extrabold text-slate-900" dir="auto">{l(PATIENT.name)}</p>
                <p className="font-mono text-sm font-semibold text-slate-500" dir="ltr">{PATIENT.id}</p>
              </div>
              <div className="flex gap-2 print:hidden">
                <button onClick={copyId} className="inline-flex items-center gap-1.5 rounded-xl border border-brand-soft px-3 py-2 text-sm font-bold text-brand-dark transition hover:bg-brand-tint active:scale-95">
                  <Copy size={16} aria-hidden />{t('copyId')}
                </button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-95">
                  <Printer size={16} aria-hidden />{t('print')}
                </button>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-brand-soft pt-5 sm:grid-cols-3">
              <Field label={t('fullName')}>{l(PATIENT.name)}</Field>
              <Field label={t('patientId')}><span dir="ltr">{PATIENT.id}</span></Field>
              <Field label={t('dob')}>{fmt(PATIENT.dob)}</Field>
              <Field label={t('age')}>{age} {t('years')}</Field>
              <Field label={t('gender')}>{l(PATIENT.gender)}</Field>
              <Field label={t('nationality')}>{l(PATIENT.nationality)}</Field>
              <Field label={t('bloodType')}><span dir="ltr" className="text-danger">{PATIENT.bloodType}</span></Field>
              <Field label={t('height')}>{PATIENT.height}</Field>
              <Field label={t('weight')}>{PATIENT.weight}</Field>
              <Field label={t('prefLang')}>{l(PATIENT.language)}</Field>
            </dl>
          </div>
        </Section>

        {/* Allergies */}
        <Section id="allergies" icon={ShieldAlert} title={t('titleAllergies')}>
          <div className="space-y-6">
            {grouped.map(({ type, items }) => {
              const Icon = ALLERGY_ICONS[type]
              return (
                <div key={type}>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-700"><Icon size={16} className="text-brand" aria-hidden />{t(ALLERGY_TITLES[type])}</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((a, i) => (
                      <article key={i} className={`rounded-2xl border bg-white p-4 shadow-card ${a.severity === 'severe' ? 'border-danger-border border-s-4 border-s-danger' : 'border-brand-soft'}`}>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <h4 className="text-base font-extrabold text-slate-900" dir="auto">{l(a.name)}</h4>
                          <SeverityBadge level={a.severity} t={t} />
                        </div>
                        <dl className="space-y-2">
                          <Field label={t('reactions')}>{l(a.reaction)}</Field>
                          <Field label={t('notes')}><span className="font-semibold text-slate-600">{l(a.notes)}</span></Field>
                        </dl>
                      </article>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        {/* Medications */}
        <Section id="medications" icon={Pill} title={t('titleMeds')}>
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-amber-800"><Info size={14} aria-hidden />{t('demoMedNote')}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {MEDS.map((m, i) => (
              <article key={i} className="rounded-2xl border border-brand-soft bg-white p-4 shadow-card">
                <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold text-brand-dark" dir="auto">
                  {m.route.en.startsWith('Intramuscular') ? <Syringe size={18} aria-hidden /> : <Pill size={18} aria-hidden />}
                  {l(m.name)}
                </h3>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-3">
                  <Field label={t('dosage')}><span dir="ltr">{m.dosage}</span></Field>
                  <Field label={t('frequency')}>{l(m.frequency)}</Field>
                  <Field label={t('route')}>{l(m.route)}</Field>
                  <Field label={t('startDate')}>{fmt(m.start)}</Field>
                  <div className="col-span-2"><Field label={t('purpose')}>{l(m.purpose)}</Field></div>
                  <div className="col-span-2"><Field label={t('notes')}><span className="font-semibold text-slate-600">{l(m.notes)}</span></Field></div>
                </dl>
              </article>
            ))}
          </div>
        </Section>

        {/* History */}
        <Section id="history" icon={ClipboardList} title={t('titleHistory')}>
          <div className="mb-3 flex justify-end print:hidden">
            <button onClick={toggleAll} className="rounded-lg border border-brand-soft px-3 py-1.5 text-xs font-bold text-brand-dark transition hover:bg-brand-tint">
              {allOpen ? t('collapseAll') : t('expandAll')}
            </button>
          </div>
          <div className="space-y-3">
            {HISTORY.map((h) => (
              <Accordion key={h.key} title={t(h.key)} icon={HISTORY_ICONS[h.key]} open={open.has(h.key)} onToggle={() => toggle(h.key)}>
                <ul className="space-y-1.5">
                  {h.items.map((it, i) => (
                    <li key={i} className="flex gap-2 text-sm font-semibold text-slate-700" dir="auto">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{l(it)}
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
        </Section>

        {/* Health info */}
        <Section id="health" icon={Stethoscope} title={t('titleHealth')}>
          <p className="mb-4 flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900"><Info size={14} aria-hidden />{t('historical')}</p>

          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-soft bg-white p-4 shadow-card">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><CalendarDays size={14} aria-hidden />{t('lastVisit')}</p>
              <p className="mt-1 font-extrabold text-slate-900">{fmt(HEALTH.lastVisit.date)}</p>
              <p className="text-sm font-semibold text-slate-600" dir="auto">{l(HEALTH.lastVisit.note)}</p>
            </div>
            <div className="rounded-2xl border border-brand-soft bg-white p-4 shadow-card">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><CalendarDays size={14} aria-hidden />{t('lastUpdate')}</p>
              <p className="mt-1 font-extrabold text-slate-900">{fmt(HEALTH.recorded)}</p>
            </div>
          </div>

          <h3 className="mb-2 text-sm font-extrabold text-slate-700">{t('vitals')} <span className="font-semibold text-slate-400">· {t('recordedOn')} {fmt(HEALTH.recorded)}</span></h3>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {HEALTH.vitals.map((v) => {
              const Icon = VITAL_ICONS[v.key]
              return (
                <div key={v.key} className="rounded-2xl border border-brand-soft bg-white p-3.5 shadow-card">
                  <Icon size={18} className="text-brand" aria-hidden />
                  <p className="mt-2 text-xs font-semibold text-slate-500">{t(v.key)}</p>
                  <p className="text-xl font-extrabold text-slate-900" dir="ltr">{v.value} <span className="text-xs font-semibold text-slate-400">{v.unit}</span></p>
                </div>
              )
            })}
          </div>

          <div className="space-y-3">
            <Accordion title={t('vaccinations')} icon={Syringe} open={open.has('vaccines')} onToggle={() => toggle('vaccines')}>
              <ul className="divide-y divide-brand-soft">
                {HEALTH.vaccines.map((v, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <span className="flex items-center gap-2 font-bold text-slate-700" dir="auto"><Check size={16} className="text-brand" aria-hidden />{l(v.name)}</span>
                    <span className="font-semibold text-slate-500">{fmt(v.date)}</span>
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title={t('labs')} icon={FlaskConical} open={open.has('labs')} onToggle={() => toggle('labs')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {HEALTH.labs.map((x) => (
                  <div key={x.name} className="rounded-xl bg-brand-tint p-3">
                    <p className="text-xs font-semibold text-slate-500" dir="ltr">{x.name}</p>
                    <p className="font-extrabold text-slate-900" dir="ltr">{x.value}</p>
                    <p className="text-xs text-slate-400" dir="ltr">ref: {x.range}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-400">{t('recordedOn')} {fmt(HEALTH.recorded)}</p>
            </Accordion>
            <Accordion title={t('physicianNotes')} icon={Stethoscope} open={open.has('notes')} onToggle={() => toggle('notes')}>
              <p className="text-sm font-semibold leading-relaxed text-slate-700" dir="auto">{l(HEALTH.physicianNotes)}</p>
            </Accordion>
          </div>
        </Section>

        {/* Footer */}
        <footer className="space-y-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="flex items-start gap-2 font-extrabold"><TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />{t('disclaimer')}</p>
          <div>
            <p className="font-bold">{t('footerPrivacyTitle')}</p>
            <p className="font-semibold text-amber-800">{t('footerPrivacy')}</p>
          </div>
          <p className="font-semibold text-amber-800">{t('footerNfc')}</p>
          <div className="flex items-center gap-2 border-t border-amber-200 pt-3">
            <Logo size={24} />
            <span className="font-extrabold text-brand-dark">SehaTag | صحة تاق</span>
            <span className="text-xs font-semibold text-amber-700">· {t('tagline')}</span>
          </div>
        </footer>
      </main>

      {/* Floating buttons */}
      <a
        href="#emergency"
        className="fixed bottom-5 start-4 z-20 inline-flex items-center gap-2 rounded-full bg-danger px-4 py-3 text-sm font-extrabold text-white shadow-lg transition active:scale-95 print:hidden"
      >
        <Siren size={18} aria-hidden />{t('navEmergency')}
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('backToTop')}
          className="fixed bottom-5 end-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark active:scale-95 print:hidden"
        >
          <ArrowUp size={22} />
        </button>
      )}

      {toast && (
        <div role="status" className="fixed inset-x-4 bottom-24 z-40 mx-auto w-fit max-w-full rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}

function EmBlock({ icon: Icon, title, items, critical }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className={`mb-2 flex items-center gap-2 text-sm font-extrabold ${critical ? 'text-danger' : 'text-slate-800'}`}>
        <Icon size={16} aria-hidden />{title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-800" dir="auto">
            {critical
              ? <TriangleAlert size={14} className="mt-1 shrink-0 text-danger" aria-hidden />
              : <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />}
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
