import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ShoppingCart,
    AlertTriangle,
    Check,
    Percent,
    TrendingUp,
    Clock,
    Gift,
} from 'lucide-react'

const expiringItems = [
    { id: 1, name: 'Aavin Milk (Green 500ml)', batch: 'B-2401', qty: 18, expiry: '6 hours', cost: 25, status: 'critical', discount: 10 },
    { id: 2, name: 'Fresh Curd / Thayir (500ml)', batch: 'B-2389', qty: 24, expiry: '1 day', cost: 30, status: 'critical', discount: 20 },
    { id: 3, name: 'Local Murukku (250g pack)', batch: 'B-2410', qty: 15, expiry: '2 days', cost: 45, status: 'critical', discount: 30 },
    { id: 4, name: 'Curry Leaves & Coriander (bundle)', batch: 'B-2395', qty: 30, expiry: '1 day', cost: 10, status: 'critical', discount: 50 },
    { id: 5, name: 'Appalam / Papad (100g)', batch: 'B-2402', qty: 12, expiry: '5 days', cost: 35, status: 'warning', discount: 15 },
    { id: 6, name: 'Aavin Milk (Orange 500ml)', batch: 'B-2415', qty: 10, expiry: '6 hours', cost: 28, status: 'critical', discount: 10 },
]

const combos = [
    { items: ['Aavin Milk', 'Filter Coffee Powder'], uplift: '+18%', reason: 'Evening combo: unsold milk + filter coffee — popular for kaapi lovers', icon: '🥛+☕' },
    { items: ['Ponni Rice', 'Toor Dal', 'Gingelly Oil'], uplift: '+31%', reason: 'Festival cooking combo — very popular before Pongal', icon: '🍚+🫘+🫗' },
    { items: ['Fresh Curd', 'Jaggery'], uplift: '+22%', reason: 'Thayir Sadam combo — daily lunch staple in Tamil households', icon: '🥛+🍯' },
    { items: ['Tea Dust', 'Aavin Milk', 'Palm Candy'], uplift: '+15%', reason: 'Morning chai essentials — daily repeat purchase', icon: '🍵+🥛+🍬' },
    { items: ['Murukku', 'Mixture', 'Appalam'], uplift: '+20%', reason: 'Evening snack bundle — sell fast-expiring snacks together', icon: '🍘+🥜+🫓' },
    { items: ['Urad Dal', 'Sambar Powder', 'Tamarind'], uplift: '+28%', reason: 'South Indian cooking starter pack — cross-sell to new customers', icon: '🫘+🌶️+🟤' },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function Bundling() {
    const [activeDiscounts, setActiveDiscounts] = useState(new Set())

    const toggleDiscount = (id) => {
        setActiveDiscounts((prev) => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const totalSaveable = expiringItems.reduce((sum, item) => sum + item.qty * item.cost, 0)

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-slate-800">Combo Offers & Expiry Manager</h2>
                <p className="text-sm text-slate-400">Stop items from getting wasted. Create combo offers to move them faster.</p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-md">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{expiringItems.length}</p>
                            <p className="text-xs text-slate-400">Items Expiring Soon</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
                            <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">₹{totalSaveable.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-slate-400">Money at Risk (if items expire)</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
                            <Percent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">{activeDiscounts.size}</p>
                            <p className="text-xs text-slate-400">Discounts Activated</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Expiring Items Table */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Items Expiring Soon
                </h3>
                <p className="text-xs text-slate-400 mb-4">Click "Set Discount" to automatically offer a price cut before they expire</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left text-xs font-semibold text-slate-400 pb-3">Product</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Stock</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Expires In</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Price</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">AI Discount</th>
                                <th className="text-center text-xs font-semibold text-slate-400 pb-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expiringItems.map((item) => {
                                const isActive = activeDiscounts.has(item.id)
                                return (
                                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                        <td className="py-3.5">
                                            <p className="text-sm font-medium text-slate-700">{item.name}</p>
                                            <p className="text-xs text-slate-400">Batch: {item.batch}</p>
                                        </td>
                                        <td className="py-3.5 text-center text-sm text-slate-500">{item.qty} units</td>
                                        <td className="py-3.5 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'critical' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                                                }`}>
                                                {item.expiry}
                                            </span>
                                        </td>
                                        <td className="py-3.5 text-center text-sm text-slate-500">₹{item.cost}</td>
                                        <td className="py-3.5 text-center">
                                            <span className="text-sm font-bold text-emerald-600">{item.discount}% OFF</span>
                                        </td>
                                        <td className="py-3.5 text-center">
                                            <button onClick={() => toggleDiscount(item.id)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActive
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                                                    }`}>
                                                {isActive ? <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Active</span> : 'Set Discount'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* AI Combo Suggestions */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-teal-600" />
                    AI Combo Suggestions
                </h3>
                <p className="text-xs text-slate-400 mb-4">Sell expiring items faster by bundling them with popular products</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {combos.map((combo, i) => (
                        <motion.div key={i} whileHover={{ y: -2 }}
                            className="rounded-xl bg-teal-50/50 border border-teal-200/60 p-4 cursor-default group">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-2xl">{combo.icon}</span>
                                <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> {combo.uplift} sales
                                </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">{combo.items.join(' + ')}</h4>
                            <p className="text-xs text-slate-500">{combo.reason}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
