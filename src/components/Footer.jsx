import { motion } from 'framer-motion'
import { BarChart3, Github, Linkedin, Mail } from 'lucide-react'

const footerLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Problem', href: '#problem' },
    { label: 'AI Modules', href: '#dashboard' },
    { label: 'Tech Stack', href: '#techstack' },
]

export default function Footer() {
    return (
        <footer className="relative pt-20 pb-10 px-6">
            <div className="section-divider mb-16 max-w-3xl mx-auto" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-6xl mx-auto"
            >
                {/* CTA Banner */}
                <div className="gradient-border rounded-3xl mb-16">
                    <div className="rounded-3xl bg-slate-950 p-10 md:p-14 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                Transform
                            </span>{' '}
                            Your Retail?
                        </h3>
                        <p className="text-slate-500 max-w-xl mx-auto mb-8">
                            Let AI handle your inventory decisions while you focus on growing your business.
                        </p>
                        <a
                            href="#dashboard"
                            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                        >
                            Get Started Now
                        </a>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                StockAI
                            </span>
                            <p className="text-xs text-slate-600">KD-II Project © 2026</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-slate-500 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[Github, Linkedin, Mail].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-slate-700">
                        Designed & Developed with ❤️ — Web-Based Stock Management System Integrated with AI Module
                    </p>
                </div>
            </motion.div>
        </footer>
    )
}
