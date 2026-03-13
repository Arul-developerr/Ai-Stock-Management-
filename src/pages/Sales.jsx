import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee,
    Package,
    ShoppingCart,
    Calendar,
} from 'lucide-react'
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

const dailySales = [
    { day: 'Mon', sales: 32000 },
    { day: 'Tue', sales: 38500 },
    { day: 'Wed', sales: 29000 },
    { day: 'Thu', sales: 45200 },
    { day: 'Fri', sales: 52000 },
    { day: 'Sat', sales: 68000 },
    { day: 'Sun', sales: 41000 },
]

const monthlySales = [
    { month: 'Sep', revenue: 685000 },
    { month: 'Oct', revenue: 742000 },
    { month: 'Nov', revenue: 810000 },
    { month: 'Dec', revenue: 1020000 },
    { month: 'Jan', revenue: 890000 },
    { month: 'Feb', revenue: 950000 },
]

const topProducts = [
    { name: 'Ponni Boiled Rice (25kg)', sold: 180, revenue: 216000 },
    { name: 'Toor Dal / Thuvaram Paruppu (1kg)', sold: 140, revenue: 18200 },
    { name: 'Gingelly Oil / Nallennai (1L)', sold: 120, revenue: 36000 },
    { name: 'Refined Sunflower Oil (1L)', sold: 110, revenue: 16500 },
    { name: 'Aavin Milk (Green 500ml)', sold: 280, revenue: 7000 },
    { name: 'Cow Ghee / Nei (500ml)', sold: 55, revenue: 16500 },
    { name: 'Filter Coffee Powder (250g)', sold: 90, revenue: 13500 },
    { name: 'Jaggery / Vellam (1kg)', sold: 75, revenue: 5625 },
]

const categoryData = [
    { name: 'Staples & Grains', value: 38, color: '#059669' },
    { name: 'Spices (Maligai Saman)', value: 22, color: '#0d9488' },
    { name: 'Oils & Dairy', value: 18, color: '#f59e0b' },
    { name: 'Beverages', value: 10, color: '#8b5cf6' },
    { name: 'Snacks & Perishables', value: 8, color: '#ec4899' },
    { name: 'Sweeteners', value: 4, color: '#64748b' },
]

const summaryCards = [
    { label: "This Week's Revenue", value: '₹3,05,700', change: '+15%', up: true, icon: IndianRupee, color: 'bg-emerald-600' },
    { label: 'Total Items Sold', value: '1,063', change: '+11%', up: true, icon: Package, color: 'bg-teal-600' },
    { label: 'Avg. Basket Size', value: '₹580', change: '+3%', up: true, icon: ShoppingCart, color: 'bg-violet-600' },
    { label: 'Best Day', value: 'Saturday', change: '₹68,000', up: true, icon: Calendar, color: 'bg-amber-500' },
]

const tabs = ['This Week', 'This Month', '6 Months']

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white rounded-xl px-4 py-3 text-xs border border-slate-200 shadow-lg">
            <p className="font-semibold text-slate-800 mb-1">{label}</p>
            {payload.map((e, i) => (
                <p key={i} className="text-slate-500">₹{e.value.toLocaleString('en-IN')}</p>
            ))}
        </div>
    )
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function Sales() {
    const [activeTab, setActiveTab] = useState('This Week')

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Sales Report</h2>
                    <p className="text-sm text-slate-400">See how your maligai shop is performing</p>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200">
                    {tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === tab
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'text-slate-400 hover:text-slate-700'
                                }`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((s, i) => (
                    <motion.div key={i} variants={itemVariants} className="glass-card rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shadow-md`}>
                                <s.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {s.change}
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                        <p className="text-xs text-slate-400 mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Daily Sales Chart */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Daily Sales</h3>
                <p className="text-xs text-slate-400 mb-4">Revenue earned each day this week</p>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailySales} barSize={32}>
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#059669" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }}
                                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="sales" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Two-Column: Monthly Revenue + Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Monthly Revenue</h3>
                    <p className="text-xs text-slate-400 mb-4">Last 6 months trend</p>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlySales}>
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2.5}
                                    fill="url(#areaGrad)" dot={{ fill: '#059669', r: 4, stroke: '#fff', strokeWidth: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Category Breakdown</h3>
                    <p className="text-xs text-slate-400 mb-4">What types of products sell the most</p>
                    <div className="flex items-center gap-6">
                        <div className="w-48 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={80}
                                        paddingAngle={3} dataKey="value" stroke="none">
                                        {categoryData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1 space-y-2">
                            {categoryData.map((c, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: c.color }} />
                                    <span className="text-sm text-slate-500 flex-1">{c.name}</span>
                                    <span className="text-sm font-semibold text-slate-800">{c.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Top Products Table */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Top Selling Products</h3>
                <p className="text-xs text-slate-400 mb-4">Your best-selling items this week</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">#</th>
                                <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">Product Name</th>
                                <th className="text-right text-xs font-semibold text-slate-400 pb-3 pr-4">Qty Sold</th>
                                <th className="text-right text-xs font-semibold text-slate-400 pb-3">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProducts.map((p, i) => (
                                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 pr-4 text-sm text-slate-400">{i + 1}</td>
                                    <td className="py-3 pr-4"><p className="text-sm font-medium text-slate-700">{p.name}</p></td>
                                    <td className="py-3 pr-4 text-right"><span className="text-sm text-slate-500">{p.sold}</span></td>
                                    <td className="py-3 text-right"><span className="text-sm font-semibold text-emerald-600">₹{p.revenue.toLocaleString('en-IN')}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    )
}
