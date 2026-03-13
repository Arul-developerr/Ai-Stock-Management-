import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    DollarSign,
    Check,
    ArrowUpRight,
    TrendingUp,
    Package,
    ShoppingCart,
    Star,
} from 'lucide-react'

const supplierData = [
    {
        item: 'Ponni Boiled Rice (25kg)',
        category: 'Staples',
        currentSupplier: 'Local Wholesale A',
        currentPrice: 1200,
        suppliers: [
            { name: 'Local Wholesale A (Current)', price: 1200, delivery: '1 day', rating: 4.2, min: '5 bags' },
            { name: 'Koyambedu Mandi Direct', price: 1050, delivery: '2 days', rating: 4.5, min: '10 bags' },
            { name: 'Online Wholesale (BigBasket B2B)', price: 1180, delivery: '3 days', rating: 4.0, min: '5 bags' },
        ],
        bestIndex: 1,
        monthlySaving: 3000,
    },
    {
        item: 'Toor Dal / Thuvaram Paruppu (25kg)',
        category: 'Pulses',
        currentSupplier: 'Regular Supplier',
        currentPrice: 3200,
        suppliers: [
            { name: 'Regular Supplier (Current)', price: 3200, delivery: '1 day', rating: 4.3, min: '2 bags' },
            { name: 'Koyambedu Mandi Direct', price: 2950, delivery: '2 days', rating: 4.6, min: '5 bags' },
            { name: 'Erode Wholesale Market', price: 3050, delivery: '3 days', rating: 4.1, min: '3 bags' },
        ],
        bestIndex: 1,
        monthlySaving: 2500,
    },
    {
        item: 'Gingelly Oil / Nallennai (15L Tin)',
        category: 'Oils',
        currentSupplier: 'Brand Distributor',
        currentPrice: 3800,
        suppliers: [
            { name: 'Chekku Oil Direct (Kanchipuram)', price: 3400, delivery: '3 days', rating: 4.7, min: '2 tins' },
            { name: 'Brand Distributor (Current)', price: 3800, delivery: '1 day', rating: 4.0, min: '1 tin' },
            { name: 'Online Wholesale', price: 3650, delivery: '2 days', rating: 3.9, min: '3 tins' },
        ],
        bestIndex: 0,
        monthlySaving: 2400,
    },
    {
        item: 'Refined Sunflower Oil (15L Tin)',
        category: 'Oils',
        currentSupplier: 'Regular Supplier',
        currentPrice: 2200,
        suppliers: [
            { name: 'Regular Supplier (Current)', price: 2200, delivery: '1 day', rating: 4.1, min: '2 tins' },
            { name: 'Koyambedu Wholesale', price: 2050, delivery: '2 days', rating: 4.4, min: '3 tins' },
            { name: 'Direct from Mill (Villupuram)', price: 1980, delivery: '4 days', rating: 4.3, min: '5 tins' },
        ],
        bestIndex: 2,
        monthlySaving: 1320,
    },
    {
        item: 'Jaggery / Vellam (10kg Block)',
        category: 'Sweeteners',
        currentSupplier: 'Local Wholesale',
        currentPrice: 650,
        suppliers: [
            { name: 'Local Wholesale (Current)', price: 650, delivery: '1 day', rating: 4.0, min: '5 blocks' },
            { name: 'Direct from Farm (Sathyamangalam)', price: 520, delivery: '3 days', rating: 4.8, min: '10 blocks' },
            { name: 'Koyambedu Mandi', price: 580, delivery: '2 days', rating: 4.2, min: '5 blocks' },
        ],
        bestIndex: 1,
        monthlySaving: 1300,
    },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function Supplier() {
    const [selectedIdx, setSelectedIdx] = useState(null)
    const totalMonthlySaving = supplierData.reduce((sum, d) => sum + d.monthlySaving, 0)

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-slate-800">Best Prices from Suppliers</h2>
                <p className="text-sm text-slate-400">Compare Koyambedu mandi, direct farm prices & online wholesale — save on every order</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">₹{totalMonthlySaving.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-slate-400">Possible Monthly Savings</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-md"><Package className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{supplierData.length}</p>
                            <p className="text-xs text-slate-400">Products Compared</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md"><ShoppingCart className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">5</p>
                            <p className="text-xs text-slate-400">Better Deals Found</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Supplier Comparison Cards */}
            <div className="space-y-4">
                {supplierData.map((data, di) => (
                    <motion.div key={di} variants={itemVariants}
                        className="glass-card rounded-2xl p-6 cursor-pointer"
                        onClick={() => setSelectedIdx(selectedIdx === di ? null : di)}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-slate-800">{data.item}</h3>
                                <p className="text-xs text-slate-400">{data.category} — Currently from {data.currentSupplier} at ₹{data.currentPrice}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-xs text-slate-400">Best Price</p>
                                    <p className="text-lg font-bold text-emerald-600">₹{data.suppliers[data.bestIndex].price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400">You Save</p>
                                    <p className="text-sm font-bold text-teal-600 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" /> ₹{data.monthlySaving}/mo
                                    </p>
                                </div>
                            </div>
                        </div>

                        {selectedIdx === di && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }} className="mt-4 pt-4 border-t border-slate-100">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {data.suppliers.map((s, si) => {
                                        const isBest = si === data.bestIndex
                                        return (
                                            <div key={si} className={`rounded-xl p-4 border transition-all ${isBest
                                                    ? 'bg-emerald-50 border-emerald-200 shadow-sm shadow-emerald-100'
                                                    : 'bg-slate-50 border-slate-200'
                                                }`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-sm font-semibold text-slate-700">{s.name}</p>
                                                    {isBest && (
                                                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
                                                            <Check className="w-2.5 h-2.5" /> BEST
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={`text-2xl font-bold mb-3 ${isBest ? 'text-emerald-600' : 'text-slate-800'}`}>
                                                    ₹{s.price}
                                                </p>
                                                <div className="space-y-1.5 text-xs text-slate-500">
                                                    <p>🚚 Delivery: {s.delivery}</p>
                                                    <p>📦 Min Order: {s.min}</p>
                                                    <p className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-amber-500" /> {s.rating} rating
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Total Savings Banner */}
            <motion.div variants={itemVariants} className="gradient-border rounded-2xl">
                <div className="rounded-2xl bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Switch to Best Suppliers</h3>
                        <p className="text-sm text-slate-400">If you switch all items to the cheapest supplier, you save:</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-emerald-600">₹{totalMonthlySaving.toLocaleString('en-IN')}/month</p>
                        <p className="text-xs text-slate-400">₹{(totalMonthlySaving * 12).toLocaleString('en-IN')} per year!</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
