import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BarChart3 } from 'lucide-react'

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Problem', href: '#problem' },
    { label: 'Modules', href: '#dashboard' },
    { label: 'Tech Stack', href: '#techstack' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-cyan-500/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                        <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                        StockAI
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#dashboard"
                        className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                    >
                        View Dashboard
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-slate-400 hover:text-white"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/5"
                    >
                        <div className="px-6 py-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#dashboard"
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-center"
                            >
                                View Dashboard
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
