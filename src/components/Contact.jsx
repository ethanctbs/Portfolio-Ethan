import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

const LINKS = [
  {
    href:  'mailto:ethan.cathebras@epitech.eu',
    label: 'ethan.cathebras@epitech.eu',
    Icon:  Mail,
    external: false,
  },
  {
    href:  'https://github.com/EthanCathebras',
    label: 'GitHub',
    Icon:  Github,
    external: true,
  },
  {
    href:  'https://linkedin.com/in/ethan-cathebras',
    label: 'LinkedIn',
    Icon:  Linkedin,
    external: true,
  },
  {
    href:  '/CV-Ethan-Cathebras.pdf',
    label: 'Télécharger le CV',
    Icon:  Download,
    external: false,
    download: true,
  },
]

export default function Contact() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center px-6 text-center">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-lg w-full"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-[11px] text-white/20 uppercase tracking-[0.2em] mb-8"
        >
          Contact
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3"
        >
          Travaillons ensemble.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-[13px] text-white/35 leading-relaxed mb-12"
        >
          Disponible pour un stage, une alternance ou un projet freelance.
          N'hésitez pas à me contacter.
        </motion.p>

        {/* Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3"
        >
          {LINKS.map(({ href, label, Icon, external, download }) => (
            <motion.a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              download={download || undefined}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/8 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-200"
            >
              <Icon size={14} className="text-white/25 group-hover:text-accent-400 transition-colors flex-shrink-0" />
              <span className="font-mono text-[12px] text-white/40 group-hover:text-white/70 transition-colors">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-[10px] text-white/15 mt-12"
        >
          Ethan Cathebras · Marseille · 2025
        </motion.p>

      </motion.div>
    </section>
  )
}
