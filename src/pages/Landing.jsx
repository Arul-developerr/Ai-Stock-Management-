import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    TrendingUp,
    AlertTriangle,
    ShoppingCart,
    Zap,
    ArrowDown,
    ArrowRight,
    Skull,
    PackageX,
    CloudRain,
    BadgeDollarSign,
    BarChart3,
} from 'lucide-react'

/* ===== FLOATING CARDS ===== */
const floatingCards = [
    { label: 'Daily Sales: ₹45,000', icon: TrendingUp, color: 'bg-emerald-600', position: 'top-[18%] left-[8%]', delay: 0, animation: 'float-slow' },
    { label: 'Expiring: Aavin Milk (6pm)', icon: AlertTriangle, color: 'bg-amber-500', position: 'top-[12%] right-[10%]', delay: 1.2, animation: 'float-medium' },
    { label: 'Combo: Milk + Filter Coffee → +18%', icon: ShoppingCart, color: 'bg-teal-600', position: 'bottom-[28%] left-[5%]', delay: 0.6, animation: 'float-medium' },
    { label: 'Saved ₹12,000 on Toor Dal!', icon: Zap, color: 'bg-emerald-500', position: 'bottom-[22%] right-[7%]', delay: 1.8, animation: 'float-slow' },
    { label: 'Pongal in 10 days — Stock Jaggery!', icon: TrendingUp, color: 'bg-orange-500', position: 'top-[45%] right-[3%]', delay: 0.9, animation: 'float-fast' },
    { label: 'Koyambedu: Rice ₹1,050/bag', icon: Zap, color: 'bg-teal-500', position: 'top-[50%] left-[2%]', delay: 2.2, animation: 'float-fast' },
]

/* ===== PROBLEMS ===== */
const problems = [
    { icon: Skull, title: 'Products Getting Wasted', description: 'Aavin milk, fresh curd, and murukku expire within 1–2 days. Without alerts, they go to waste — 100% loss.', color: 'bg-red-500', stat: '₹2.4L/year', statLabel: 'Average waste loss' },
    { icon: PackageX, title: 'Items Not Selling', description: 'That one brand of sambar powder sits on the shelf for months. Your money and shelf space — both wasted.', color: 'bg-amber-500', stat: '18%', statLabel: 'Of your stock is dead' },
    { icon: CloudRain, title: 'Not Ready for Festivals', description: 'Pongal comes and you run out of jaggery, raw rice, and ghee. Karthigai Deepam — no gingelly oil left.', color: 'bg-sky-500', stat: '34%', statLabel: 'Sales lost during festivals' },
    { icon: BadgeDollarSign, title: 'Paying Too Much', description: 'Toor dal prices change daily at Koyambedu mandi. Buying from the same supplier means you miss the best rates.', color: 'bg-violet-500', stat: '₹8K+', statLabel: 'Possible monthly savings' },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function Landing() {
    const heroRef = useRef(null)
    const problemRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const isInView = useInView(problemRef, { once: true, margin: '-100px' })

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800 overflow-x-hidden">
            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-bold text-slate-800">Stock<span className="text-emerald-600">AI</span></span>
                            <p className="text-[10px] text-slate-400 -mt-0.5">Smart Maligai Manager</p>
                        </div>
                    </a>
                    <Link to="/dashboard"
                        className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Open Dashboard →
                    </Link>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient grid-dots">
                {/* Floating Cards */}
                {floatingCards.map((card, i) => (
                    <div key={i} className={`absolute ${card.position} hidden lg:block ${card.animation}`} style={{ animationDelay: `${card.delay}s` }}>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.5 + card.delay * 0.3 }}
                            className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg shadow-slate-200/60 border border-slate-100 max-w-[260px]">
                            <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center shrink-0`}>
                                <card.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-slate-600 leading-tight">{card.label}</span>
                        </motion.div>
                    </div>
                ))}

                <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">AI-Powered — Made for Tamil Nadu Grocery Shops</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
                        <span className="text-slate-800">Stock</span>
                        <span className="text-emerald-600">AI</span>
                        <br />
                        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-400 leading-relaxed">
                            Your Smart Maligai Assistant
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Stop wasting Aavin milk. Know when to stock jaggery for Pongal. Get Koyambedu mandi rates instantly. All in one simple dashboard.
                    </motion.p>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/dashboard"
                            className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                            Open My Dashboard <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="#problems"
                            className="px-8 py-4 rounded-2xl border border-slate-200 text-slate-500 font-medium text-lg hover:bg-white hover:text-slate-800 hover:border-slate-300 transition-all duration-300">
                            How It Works
                        </a>
                    </motion.div>

                    {/* Scroll */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="mt-20">
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex flex-col items-center gap-2 text-slate-400">
                            <span className="text-xs uppercase tracking-widest">Scroll to see more</span>
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== PROBLEMS ===== */}
            <section id="problems" className="relative py-28 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Common Problems</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                        Why Shop Owners <span className="text-red-500">Lose Money</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Every maligai kadai faces these problems daily. Our AI solves all of them.
                    </motion.p>
                </div>

                <motion.div ref={problemRef} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    {problems.map((p, i) => (
                        <motion.div key={i} variants={cardVariants} className="glass-card rounded-2xl p-7 group">
                            <div className="flex items-start gap-5">
                                <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <p.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{p.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.description}</p>
                                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                        <span className="text-xl font-black text-red-500">{p.stat}</span>
                                        <span className="text-xs text-slate-400">{p.statLabel}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 px-6 bg-gray-50">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto">
                    <div className="gradient-border rounded-3xl">
                        <div className="rounded-3xl bg-white p-10 md:p-14 text-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                Start Saving Money <span className="text-emerald-600">Today</span>
                            </h3>
                            <p className="text-slate-500 max-w-xl mx-auto mb-8">
                                Open your dashboard and let AI manage your maligai inventory. Simple, clean, and powerful.
                            </p>
                            <Link to="/dashboard"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                                Open Dashboard <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="py-8 px-6 border-t border-slate-200 text-center bg-white">
                <p className="text-xs text-slate-400">StockAI — KD-II Project © 2026 | Built with ❤️ for Tamil Nadu Retail Sellers</p>
            </footer>
        </div>
    )
}
