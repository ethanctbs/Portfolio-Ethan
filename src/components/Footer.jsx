import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/EthanCathebras',
    icon: Github,
    color: 'hover:text-white',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ethan-cathebras',
    icon: Linkedin,
    color: 'hover:text-blue-400',
  },
  {
    label: 'Email',
    href: 'mailto:ethan.cathebras@epitech.eu',
    icon: Mail,
    color: 'hover:text-accent-400',
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="w-full border-t border-white/8 py-24 px-8 md:px-16">
      <div className="w-full max-w-none">

        {/* CTA contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-accent-400 text-sm mb-3">— Me contacter —</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-8">
            Disponible pour des stages, alternances ou projets en freelance. N'hésitez pas à me
            contacter !
          </p>
          <a href="mailto:ethan.cathebras@epitech.eu" className="btn-primary">
            <Mail size={18} />
            ethan.cathebras@epitech.eu
          </a>
        </motion.div>

        {/* Séparateur */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Réseaux & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Liens réseaux */}
          <div className="flex items-center gap-6">
            {links.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-white/40 transition-colors duration-200 ${color}`}
              >
                <Icon size={22} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Fait avec <Heart size={13} className="text-rose-400 fill-rose-400" /> par Ethan
            Cathebras · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
