import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TrendingUp, AlertTriangle, ShoppingCart, Zap, ArrowDown } from 'lucide-react'

const floatingCards = [
    {
        label: 'Demand +40%',
        icon: TrendingUp,
        color: 'from-emerald-500 to-cyan-500',
        glow: 'shadow-emerald-500/20',
        position: 'top-[18%] left-[8%]',
        delay: 0,
        animation: 'float-slow',
    },
    {
        label: 'Expiry Alert: Peanut Butter',
        icon: AlertTriangle,
        color: 'from-amber-500 to-orange-500',
        glow: 'shadow-amber-500/20',
        position: 'top-[12%] right-[10%]',
        delay: 1.2,
        animation: 'float-medium',
    },
    {
        label: 'Bundle: Bread + PB → +23% Sales',
        icon: ShoppingCart,
        color: 'from-violet-500 to-pink-500',
        glow: 'shadow-violet-500/20',
        position: 'bottom-[28%] left-[5%]',
        delay: 0.6,
        animation: 'float-medium',
    },
    {
        label: 'Savings ₹12K This Month',
        icon: Zap,
        color: 'from-cyan-500 to-blue-500',
        glow: 'shadow-cyan-500/20',
        position: 'bottom-[22%] right-[7%]',
        delay: 1.8,
        animation: 'float-slow',
    },
    {
        label: 'Weather: Heatwave → Stock Cold Drinks',
        icon: TrendingUp,
        color: 'from-sky-500 to-indigo-500',
        glow: 'shadow-sky-500/20',
        position: 'top-[45%] right-[3%]',
        delay: 0.9,
        animation: 'float-fast',
    },
    {
        label: 'Supplier A: ₹120/kg',
        icon: Zap,
        color: 'from-teal-500 to-emerald-500',
        glow: 'shadow-teal-500/20',
        position: 'top-[50%] left-[2%]',
        delay: 2.2,
        animation: 'float-fast',
    },
]

export default function Hero() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section
            id="hero"
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient grid-dots"
        >
            {/* Radial Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px] glow-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[128px] glow-pulse" style={{ animationDelay: '1.5s' }} />

            {/* Floating Cards */}
            {floatingCards.map((card, i) => (
                <div
                    key={i}
                    className={`absolute ${card.position} hidden lg:block ${card.animation}`}
                    style={{ animationDelay: `${card.delay}s` }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 + card.delay * 0.3 }}
                        className={`glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl ${card.glow} max-w-[240px]`}
                    >
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0`}>
                            <card.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-300 leading-tight">
                            {card.label}
                        </span>
                    </motion.div>
                </div>
            ))}

            {/* Main Content */}
            <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        AI-Powered Retail Intelligence
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
                >
                    <span className="text-white">Stock</span>
                    <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                        AI
                    </span>
                    <br />
                    <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-400 leading-relaxed">
                        Intelligent Inventory Management
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Transform your retail operations with AI-driven smart bundling,
                    demand forecasting, dead-stock liquidation, and supplier optimization.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#dashboard"
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                    >
                        Explore Dashboard
                    </a>
                    <a
                        href="#problem"
                        className="px-8 py-4 rounded-2xl border border-white/10 text-slate-400 font-medium text-lg hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                        Learn More
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-20"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 text-slate-600"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}
