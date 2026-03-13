import { motion } from 'framer-motion'

const techItems = [
    {
        name: 'React',
        desc: 'Interactive UI',
        color: 'from-cyan-400 to-cyan-600',
        icon: '⚛️',
    },
    {
        name: 'Node.js',
        desc: 'Backend Runtime',
        color: 'from-emerald-400 to-emerald-600',
        icon: '🟢',
    },
    {
        name: 'MongoDB',
        desc: 'NoSQL Database',
        color: 'from-green-400 to-green-600',
        icon: '🍃',
    },
    {
        name: 'Python',
        desc: 'AI/ML Engine',
        color: 'from-yellow-400 to-blue-500',
        icon: '🐍',
    },
    {
        name: 'Tailwind CSS',
        desc: 'Utility Styling',
        color: 'from-sky-400 to-sky-600',
        icon: '🎨',
    },
    {
        name: 'Express.js',
        desc: 'API Framework',
        color: 'from-slate-300 to-slate-500',
        icon: '🚀',
    },
    {
        name: 'Scikit-Learn',
        desc: 'ML Algorithms',
        color: 'from-orange-400 to-orange-600',
        icon: '🤖',
    },
    {
        name: 'Framer Motion',
        desc: 'Animations',
        color: 'from-violet-400 to-pink-500',
        icon: '✨',
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
}

export default function TechStack() {
    return (
        <section id="techstack" className="relative py-32 px-6">
            <div className="section-divider mb-20 max-w-3xl mx-auto" />

            <div className="max-w-4xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                        Tech Stack
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                    Built With{' '}
                    <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Modern Tools
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-500 max-w-2xl mx-auto"
                >
                    A robust MERN stack foundation enhanced by Python AI services
                    and world-class frontend tooling.
                </motion.p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {techItems.map((tech, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -6, scale: 1.04 }}
                        className="glass-card rounded-2xl p-6 text-center cursor-default group"
                    >
                        <div className="text-4xl mb-3">{tech.icon}</div>
                        <h4 className={`text-base font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-1`}>
                            {tech.name}
                        </h4>
                        <p className="text-xs text-slate-500">{tech.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Architecture Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-3xl mx-auto mt-16"
            >
                <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-2 shrink-0">
                        {['⚛️', '→', '🚀', '→', '🍃', '→', '🐍'].map((item, i) => (
                            <span
                                key={i}
                                className={`text-lg ${item === '→' ? 'text-slate-600 text-sm' : ''}`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">Full-Stack Architecture</p>
                        <p className="text-xs text-slate-500">
                            React UI → Express API → MongoDB Store → Python AI Engine (Flask/FastAPI)
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
