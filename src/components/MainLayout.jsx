import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Mail, Phone } from 'lucide-react'
import Timeline from './Timeline'
import ProjectsGallery from './ProjectsGallery'

/* ── Constants ── */
const NAV_LINKS = [
  { href: '#projets',  label: 'Projets'  },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact',  label: 'Contact'  },
]

const HERO_STATS = [
  { value: '12',    label: 'Projets réalisés' },
  { value: '5',     label: 'Spécialisations'  },
  { value: 'Bac+5', label: 'Diplôme visé'    },
]

const MINI_SKILLS = [
  'React', 'Python', 'PHP', 'SQL', 'JavaScript',
  'GitHub', 'Canva', 'HTML', 'CSS', 'Docker',
]

/* ── Animation presets ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

/* ── Skill marquee ── */
function MiniMarquee() {
  const items = [...MINI_SKILLS, ...MINI_SKILLS]
  return (
    <div
      className="overflow-hidden mb-3"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((skill, i) => (
          <span key={i} className="font-mono text-[10px] text-slate-400 shrink-0">
            {skill}
            <span className="mx-3 text-slate-300">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Fixed header ── */
function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-100"
    >
      <div className="flex items-center justify-between h-14 px-6 md:px-14">
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="cursor-pointer font-mono text-sm font-bold tracking-wider select-none"
          aria-label="Retour en haut de page"
        >
          <span className="text-slate-900">ET</span><span className="text-blue-600">CA</span>
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="flex items-center gap-5 md:gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs text-slate-500 hover:text-slate-900
                           transition-colors uppercase tracking-widest"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
            <a href="https://github.com/ethanctbs" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="GitHub">
              <Github size={15} />
            </a>
            <a href="https://www.linkedin.com/in/ethanctbs/" target="_blank" rel="noopener noreferrer"
               className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="LinkedIn">
              <Linkedin size={15} />
            </a>
            <a href="mailto:ethan.cathebras@epitech.eu"
               className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="Email">
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

/* ── Section heading ── */
function SectionHeader({ label, title }) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">{label}</span>
        <h2
          className="font-black text-slate-900 tracking-tighter leading-none"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {title}
        </h2>
      </div>
    </motion.div>
  )
}

/* ── Hero — left-aligned identity block ── */
function IntroSection() {
  return (
    <section
      aria-label="Introduction"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-16"
    >
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">

        {/* Marquee */}
        <motion.div variants={fadeUp}>
          <MiniMarquee />
        </motion.div>

        {/* Status */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs text-blue-600 uppercase tracking-[0.25em] mb-8"
        >
          Étudiant · 1ère année Epitech Marseille · Promo 2028 · Disponible
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-black text-slate-900 tracking-tighter leading-none mb-5"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
        >
          ETHAN
          <br />
          <span className="text-blue-600">CATHEBRAS</span>
        </motion.h1>

        {/* Specialties */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-sm text-slate-400 uppercase tracking-[0.2em] mb-10"
        >
          Full-Stack &nbsp;·&nbsp; IA &nbsp;·&nbsp; Cyber-sécurité
        </motion.p>

        {/* Contacts */}
        <motion.div variants={fadeUp} className="relative z-10 flex flex-col gap-2.5 mb-8">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
            <a href="https://github.com/ethanctbs" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
              <Github size={15} />
              <span className="text-sm font-mono">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/ethanctbs/" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
              <Linkedin size={15} />
              <span className="text-sm font-mono">LinkedIn</span>
            </a>
          </div>
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
            <a href="mailto:ethan.cathebras@epitech.eu"
               className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Mail size={15} />
              <span className="text-sm font-mono">ethan.cathebras@epitech.eu</span>
            </a>
            <a href="tel:+33602476054"
               className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Phone size={15} />
              <span className="text-sm font-mono">06 02 47 60 54</span>
            </a>
          </div>
        </motion.div>

        {/* CV + scroll */}
        <motion.div variants={fadeUp} className="relative z-10 flex items-center gap-4 flex-wrap mb-14">
          <a
            href="/CV-Ethan-Cathebras.pdf"
            download
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                       bg-slate-900 text-white text-sm font-semibold
                       hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Download size={15} />
            Télécharger mon CV
          </a>
          <a
            href="#projets"
            className="inline-flex items-center gap-2 text-sm text-slate-400
                       hover:text-slate-900 transition-colors group"
          >
            Voir les projets
            <ArrowDown size={13} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="flex items-end flex-wrap gap-10 pt-8 border-t border-slate-200"
        >
          {HERO_STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-slate-900 tracking-tight leading-none">{value}</div>
              <div className="mt-1 text-xs text-slate-500 font-mono uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}

/* ── Contact section — premium card ── */
function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="min-h-[70vh] flex flex-col justify-center py-20 px-6 md:px-20 bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Section header — same structure as Projets / Parcours */}
        <div className="mb-10">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">03.</span>
            <h2
              className="font-black text-white tracking-tighter leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Contact
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-600">
            Travaillons ensemble sur vos projets IA &amp; Cyber.
          </p>
        </div>

        {/* Contact card */}
        <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
          {/* Inner glow — top-left relief */}
          <div
            className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)' }}
          />

          <div className="relative z-10 p-8 md:p-10">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full
                            border border-zinc-700 bg-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
                Disponible pour projets
              </span>
            </div>

            {/* Email */}
            <div className="mb-6">
              <a
                href="mailto:ethan.cathebras@epitech.eu"
                className="group flex items-center gap-3"
              >
                <Mail size={20} className="text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0" />
                <span className="font-bold text-white tracking-tight leading-tight
                                 group-hover:text-blue-400 transition-colors
                                 text-lg md:text-2xl break-all">
                  ethan.cathebras@epitech.eu
                </span>
              </a>
            </div>

            {/* Phone */}
            <div className="mb-8">
              <a
                href="tel:+33602476054"
                className="group flex items-center gap-3"
              >
                <Phone size={20} className="text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0" />
                <span className="font-bold text-white text-lg md:text-2xl tracking-tight
                                 group-hover:text-blue-400 transition-colors">
                  06 02 47 60 54
                </span>
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-800 mb-5" />

            {/* Metadata */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs text-zinc-600">Marseille, FR</span>
              <span className="text-zinc-700 text-xs">·</span>
              <span className="font-mono text-xs text-zinc-600">GMT+1</span>
              <span className="text-zinc-700 text-xs">·</span>
              <span className="font-mono text-xs text-zinc-600">Epitech Promo 2028</span>
            </div>
          </div>
        </div>

        {/* Social outline buttons */}
        <div className="flex items-center gap-3 mt-5">
          <a
            href="https://github.com/ethanctbs"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       border border-zinc-800 text-zinc-400 text-sm font-medium
                       hover:text-white hover:border-zinc-600 transition-all"
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ethanctbs/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       border border-zinc-800 text-zinc-400 text-sm font-medium
                       hover:text-white hover:border-zinc-600 transition-all"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
        </div>

        {/* Footer */}
        <p className="mt-12 font-mono text-xs text-zinc-800 uppercase tracking-widest">
          © 2026 ETCA — Conçu avec passion à Marseille.
        </p>
      </motion.div>
    </section>
  )
}

/* ── Root layout ── */
export default function MainLayout() {
  return (
    <motion.div
      className="relative h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Header />

      <main className="h-screen overflow-y-auto scroll-smooth pt-14 overflow-x-hidden">

        {/* ── 00. Hero ── */}
        <IntroSection />

        {/* ── 01. Projets ── */}
        <section id="projets" aria-label="Projets"
          className="py-16 px-6 md:px-20 border-t border-slate-100">
          <SectionHeader label="01." title="Projets" />
          <ProjectsGallery />
        </section>

        {/* ── 02. Parcours ── */}
        <section id="parcours" aria-label="Parcours"
          className="py-16 px-6 md:px-20 border-t border-slate-100">
          <SectionHeader label="02." title="Parcours" />
          <Timeline />
        </section>

        {/* ── 03. Contact — form ── */}
        <ContactSection />

      </main>
    </motion.div>
  )
}
