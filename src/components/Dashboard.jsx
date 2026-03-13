import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    ShoppingCart,
    CloudSun,
    PackageX,
    DollarSign,
    AlertTriangle,
    TrendingUp,
    ArrowDownRight,
    ArrowUpRight,
    Check,
} from 'lucide-react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

/* ---- Mock Data ---- */
const forecastData = [
    { day: 'Mon', predicted: 120, actual: 115 },
    { day: 'Tue', predicted: 145, actual: 140 },
    { day: 'Wed', predicted: 160, actual: 155 },
    { day: 'Thu', predicted: 210, actual: 200 },
    { day: 'Fri', predicted: 280, actual: null },
    { day: 'Sat', predicted: 350, actual: null },
    { day: 'Sun', predicted: 310, actual: null },
]

const expiryItems = [
    { name: 'Peanut Butter (500g)', expiry: '2 days', discount: '50%', status: 'critical' },
    { name: 'Greek Yogurt', expiry: '3 days', discount: '35%', status: 'warning' },
    { name: 'Fresh Bread Loaf', expiry: '1 day', discount: '60%', status: 'critical' },
]

const deadStock = [
    { name: 'Organic Quinoa', months: 4, turnover: 8, trend: 'down' },
    { name: 'Avocado Oil (1L)', months: 3, turnover: 12, trend: 'down' },
    { name: 'Chia Seeds Pack', months: 5, turnover: 5, trend: 'down' },
]

const supplierPrices = [
    {
        item: 'Rice (25kg)', suppliers: [
            { name: 'Supplier A', price: 1200, best: false },
            { name: 'Supplier B', price: 1050, best: true },
            { name: 'Supplier C', price: 1180, best: false },
        ]
    },
    {
        item: 'Sugar (10kg)', suppliers: [
            { name: 'Supplier A', price: 480, best: true },
            { name: 'Supplier B', price: 520, best: false },
            { name: 'Supplier C', price: 510, best: false },
        ]
    },
]

/* ---- Animation Variants ---- */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
}

/* ---- Custom Tooltip ---- */
function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="glass-card rounded-xl px-4 py-3 text-xs">
            <p className="font-semibold text-white mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color }} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                    {entry.name}: {entry.value} units
                </p>
            ))}
        </div>
    )
}

/* ==== DASHBOARD SECTION ==== */
export default function Dashboard() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="dashboard" className="relative py-32 px-6">
            <div className="section-divider mb-20 max-w-3xl mx-auto" />

            {/* Section Header */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        AI Modules
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                    The{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                        Intelligence
                    </span>{' '}
                    Dashboard
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-500 max-w-2xl mx-auto"
                >
                    Four AI-powered modules working together to maximize revenue,
                    minimize waste, and optimize every purchase decision.
                </motion.p>
            </div>

            {/* Module Grid */}
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* Module 1: Smart Bundling */}
                <motion.div variants={cardVariants} className="group glass-card rounded-3xl p-8 group-hover:shadow-cyan-500/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Smart Bundling & Expiry Management</h3>
                            <p className="text-xs text-slate-500">Module 1 — Market Basket Analysis</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {expiryItems.map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between rounded-xl px-4 py-3 border ${item.status === 'critical'
                                        ? 'bg-red-500/5 border-red-500/20'
                                        : 'bg-amber-500/5 border-amber-500/20'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <AlertTriangle
                                        className={`w-4 h-4 ${item.status === 'critical' ? 'text-red-400' : 'text-amber-400'
                                            }`}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.name}</p>
                                        <p className="text-xs text-slate-500">Expires in {item.expiry}</p>
                                    </div>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'critical'
                                            ? 'bg-red-500/20 text-red-300'
                                            : 'bg-amber-500/20 text-amber-300'
                                        }`}
                                >
                                    {item.discount} OFF
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-xs text-emerald-400 font-semibold">
                            💡 AI Suggestion: Bundle "Peanut Butter + Bread" → Predicted +23% sales uplift
                        </p>
                    </div>
                </motion.div>

                {/* Module 2: Demand Forecasting */}
                <motion.div variants={cardVariants} className="group glass-card rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                            <CloudSun className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Contextual Demand Forecasting</h3>
                            <p className="text-xs text-slate-500">Module 2 — Weather & Event Intelligence</p>
                        </div>
                    </div>

                    {/* Weather Alert */}
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-sky-500/5 border border-sky-500/20">
                        <CloudSun className="w-5 h-5 text-sky-400" />
                        <div>
                            <p className="text-xs font-semibold text-sky-300">Heatwave Alert — Next 3 Days</p>
                            <p className="text-xs text-slate-500">Cold drinks demand predicted to surge +180%</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-48 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={forecastData}>
                                <defs>
                                    <linearGradient id="gradientPredicted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradientActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 11 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 11 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="predicted"
                                    stroke="#06b6d4"
                                    strokeWidth={2}
                                    fill="url(#gradientPredicted)"
                                    name="Predicted"
                                    dot={{ fill: '#06b6d4', r: 3 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    fill="url(#gradientActual)"
                                    name="Actual"
                                    dot={{ fill: '#8b5cf6', r: 3 }}
                                    connectNulls={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Predicted
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Actual
                        </span>
                    </div>
                </motion.div>

                {/* Module 3: Dead-Stock Liquidation */}
                <motion.div variants={cardVariants} className="group glass-card rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <PackageX className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Dead-Stock Liquidation</h3>
                            <p className="text-xs text-slate-500">Module 3 — Turnover Rate Monitoring</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {deadStock.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-medium text-white">{item.name}</span>
                                        <div className="flex items-center gap-1 text-red-400">
                                            <ArrowDownRight className="w-3 h-3" />
                                            <span className="text-xs font-semibold">{item.turnover}% turnover</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.turnover}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Stagnant for {item.months} months
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <p className="text-xs text-amber-400 font-semibold">
                            ⚡ AI Action: Auto-generate "Buy 1 Get 1" promo for Organic Quinoa
                        </p>
                    </div>
                </motion.div>

                {/* Module 4: Supplier Optimization */}
                <motion.div variants={cardVariants} className="group glass-card rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Supplier Optimization</h3>
                            <p className="text-xs text-slate-500">Module 4 — Real-Time Price Intelligence</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {supplierPrices.map((group, gi) => (
                            <div key={gi}>
                                <p className="text-sm font-semibold text-slate-300 mb-2">{group.item}</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {group.suppliers.map((s, si) => (
                                        <div
                                            key={si}
                                            className={`rounded-xl p-3 text-center border transition-all ${s.best
                                                    ? 'bg-emerald-500/10 border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                                                    : 'bg-slate-800/30 border-white/5'
                                                }`}
                                        >
                                            <p className="text-xs text-slate-500 mb-1">{s.name}</p>
                                            <p className={`text-lg font-bold ${s.best ? 'text-emerald-400' : 'text-white'}`}>
                                                ₹{s.price}
                                            </p>
                                            {s.best && (
                                                <div className="flex items-center justify-center gap-1 mt-1">
                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-[10px] font-semibold text-emerald-400 uppercase">Best</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between p-3 rounded-xl bg-violet-500/5 border border-violet-500/20">
                        <p className="text-xs text-violet-400 font-semibold">
                            💰 Estimated Savings This Reorder
                        </p>
                        <span className="text-lg font-black text-emerald-400 flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" /> ₹4,200
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
