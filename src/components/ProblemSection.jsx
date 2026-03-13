import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Skull, PackageX, CloudRain, BadgeDollarSign } from 'lucide-react'

const problems = [
    {
        icon: Skull,
        title: 'Financial Loss from Spoilage',
        description:
            'Products like dairy and bread expire on the shelf without any proactive attempt to sell them quickly, resulting in a 100% loss per unit.',
        color: 'from-red-500 to-orange-500',
        glow: 'group-hover:shadow-red-500/20',
        stat: '₹2.4L',
        statLabel: 'Avg. annual spoilage loss',
    },
    {
        icon: PackageX,
        title: 'Capital Tied in Dead Stock',
        description:
            'Unpopular items occupy valuable shelf space for months without selling, locking up capital that could be reinvested.',
        color: 'from-amber-500 to-yellow-500',
        glow: 'group-hover:shadow-amber-500/20',
        stat: '18%',
        statLabel: 'Avg. inventory is dead stock',
    },
    {
        icon: CloudRain,
        title: 'Unprepared for Demand Surges',
        description:
            'Running out of seasonal or weather-dependent goods during unexpected heatwaves or festivals due to zero forecasting.',
        color: 'from-sky-500 to-blue-500',
        glow: 'group-hover:shadow-sky-500/20',
        stat: '34%',
        statLabel: 'Sales lost in peak season',
    },
    {
        icon: BadgeDollarSign,
        title: 'Overpaying for Goods',
        description:
            'Missing bulk discounts and lower prices from competing wholesale suppliers because reordering is done habitually from a single source.',
        color: 'from-violet-500 to-purple-500',
        glow: 'group-hover:shadow-violet-500/20',
        stat: '₹8K+',
        statLabel: 'Potential monthly savings',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

export default function ProblemSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="problem" className="relative py-32 px-6">
            <div className="section-divider mb-20 max-w-3xl mx-auto" />

            {/* Section Header */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                        The Problem
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                    Why Retail Sellers{' '}
                    <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Lose Money
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-500 max-w-2xl mx-auto"
                >
                    Traditional inventory management is reactive, manual, and expensive.
                    Here are the critical pain points our AI system solves.
                </motion.p>
            </div>

            {/* Problem Cards */}
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {problems.map((problem, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className={`group glass-card rounded-2xl p-8 cursor-default ${problem.glow}`}
                    >
                        <div className="flex items-start gap-5">
                            <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                                <problem.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                    {problem.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    {problem.description}
                                </p>
                                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                                    <span className={`text-2xl font-black bg-gradient-to-r ${problem.color} bg-clip-text text-transparent`}>
                                        {problem.stat}
                                    </span>
                                    <span className="text-xs text-slate-600">{problem.statLabel}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
