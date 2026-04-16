import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    PackageX,
    AlertTriangle,
    ArrowDownRight,
    Megaphone,
    Check,
} from 'lucide-react'

const deadStockItems = [
    { id: 1, name: 'Organic Sambar Powder (Brand X)', category: 'Spices', price: 120, stock: 35, monthsStagnant: 5, turnover: 5, suggestion: 'Free sample with 25kg Ponni Rice' },
    { id: 2, name: 'Imported Olive Oil (500ml)', category: 'Oils', price: 480, stock: 15, monthsStagnant: 6, turnover: 3, suggestion: '40% Discount' },
    { id: 3, name: 'Perungayam Block (50g)', category: 'Spices', price: 85, stock: 28, monthsStagnant: 4, turnover: 8, suggestion: 'Bundle with Toor Dal' },
    { id: 4, name: 'Brown Rice (5kg)', category: 'Grains', price: 380, stock: 12, monthsStagnant: 4, turnover: 7, suggestion: 'Healthy eating combo offer' },
    { id: 5, name: 'Almond Milk (1L)', category: 'Dairy Alt', price: 220, stock: 18, monthsStagnant: 5, turnover: 4, suggestion: '30% Discount' },
    { id: 6, name: 'Quinoa (500g)', category: 'Grains', price: 320, stock: 22, monthsStagnant: 7, turnover: 2, suggestion: 'Buy 1 Get 1' },
    { id: 7, name: 'Herbal Tea Premium (25 bags)', category: 'Beverages', price: 180, stock: 20, monthsStagnant: 3, turnover: 10, suggestion: 'Near counter display' },
    { id: 8, name: 'Chia Seeds (250g)', category: 'Seeds', price: 250, stock: 14, monthsStagnant: 5, turnover: 5, suggestion: 'Bundle with Pottukadalai' },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function DeadStock() {
    const [items, setItems] = useState(deadStockItems.map(i => ({ ...i, applied: false })))
    const [filter, setFilter] = useState('all')

    const toggleApply = (id) => {
        setItems((prev) =>
            prev.map((item) => item.id === id ? { ...item, applied: !item.applied } : item)
        )
    }

    const totalCapitalLocked = items.reduce((sum, i) => sum + i.price * i.stock, 0)
    const appliedCount = items.filter((i) => i.applied).length
    const criticalCount = items.filter((i) => i.monthsStagnant >= 5).length

    const filtered = filter === 'all' ? items :
        filter === 'critical' ? items.filter(i => i.monthsStagnant >= 5) :
            items.filter(i => i.applied)

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-slate-800">Slow Moving Items</h2>
                <p className="text-sm text-slate-400">These items sit on your shelf too long. Clear them out with smart offers.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-md"><PackageX className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{items.length}</p>
                            <p className="text-xs text-slate-400">Slow Moving Items</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md"><AlertTriangle className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">₹{totalCapitalLocked.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-slate-400">Your Money Stuck in Stock</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md"><Megaphone className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">{appliedCount}</p>
                            <p className="text-xs text-slate-400">Promos Activated</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filter Tabs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
                {[
                    { key: 'all', label: `All Items (${items.length})` },
                    { key: 'critical', label: `Critical (${criticalCount})` },
                    { key: 'applied', label: `Promo Active (${appliedCount})` },
                ].map((tab) => (
                    <button key={tab.key} onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filter === tab.key
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200'
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {/* Items Table */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left text-xs font-semibold text-slate-400 pb-3">Product</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Stock</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Months Sitting</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Sales Speed</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Capital Stuck</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">AI Suggestion</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3.5">
                                        <p className="text-sm font-medium text-slate-700">{item.name}</p>
                                        <p className="text-xs text-slate-400">{item.category}</p>
                                    </td>
                                    <td className="py-3.5 text-center text-sm text-slate-500">{item.stock} units</td>
                                    <td className="py-3.5 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.monthsStagnant >= 5 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                                            }`}>
                                            {item.monthsStagnant} months
                                        </span>
                                    </td>
                                    <td className="py-3.5 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full rounded-full bg-gradient-to-r from-red-400 to-amber-400"
                                                    style={{ width: `${item.turnover}%` }} />
                                            </div>
                                            <span className="text-xs text-red-500 flex items-center gap-0.5">
                                                <ArrowDownRight className="w-3 h-3" />{item.turnover}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 text-center text-sm font-semibold text-amber-600">
                                        ₹{(item.price * item.stock).toLocaleString('en-IN')}
                                    </td>
                                    <td className="py-3.5 text-center">
                                        <span className="px-2 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-medium">
                                            {item.suggestion}
                                        </span>
                                    </td>
                                    <td className="py-3.5 text-center">
                                        <button onClick={() => toggleApply(item.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${item.applied
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                                                }`}>
                                            {item.applied ? <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Active</span> : 'Apply'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Tips */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 bg-amber-50/50 border-amber-200">
                <h3 className="text-base font-bold text-amber-700 mb-2">💡 Tips to Clear Slow Items</h3>
                <ul className="space-y-1.5 text-sm text-slate-500">
                    <li>• Give Sambar powder free with every 25kg rice bag — builds customer loyalty</li>
                    <li>• Place slow items near the billing counter — impulse buys work!</li>
                    <li>• Run a "Clearance" shelf with all discounted items together</li>
                    <li>• Share offers on your shop's WhatsApp group to regular customers</li>
                </ul>
            </motion.div>
        </motion.div>
    )
}
