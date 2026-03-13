import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    TrendingUp,
    ShoppingCart,
    CloudSun,
    PackageX,
    DollarSign,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee,
    Package,
    Users,
} from 'lucide-react'

const stats = [
    { label: "Today's Sales", value: '₹45,200', change: '+12%', up: true, icon: IndianRupee, color: 'bg-emerald-600' },
    { label: 'Items Sold Today', value: '134', change: '+8%', up: true, icon: Package, color: 'bg-teal-600' },
    { label: 'Expiring Soon', value: '4 items', change: 'Needs action', up: false, icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Customers Today', value: '48', change: '+5%', up: true, icon: Users, color: 'bg-violet-600' },
]

const quickLinks = [
    { to: '/dashboard/sales', icon: TrendingUp, label: 'Sales Report', desc: 'See how your shop is doing', color: 'bg-emerald-600' },
    { to: '/dashboard/bundling', icon: ShoppingCart, label: 'Combo Offers', desc: 'Bundle expiring items to sell faster', color: 'bg-teal-600' },
    { to: '/dashboard/forecasting', icon: CloudSun, label: 'What Will Sell?', desc: 'AI predicts tomorrow\'s demand', color: 'bg-sky-600' },
    { to: '/dashboard/deadstock', icon: PackageX, label: 'Slow Items', desc: 'Clear items sitting too long', color: 'bg-amber-600' },
    { to: '/dashboard/supplier', icon: DollarSign, label: 'Best Prices', desc: 'Compare Koyambedu wholesale rates', color: 'bg-violet-600' },
]

const alerts = [
    { type: 'critical', icon: AlertTriangle, message: 'Aavin Milk (Green) — 18 packets unsold by 6pm. Set combo with Filter Coffee?', time: '10 min ago' },
    { type: 'warning', icon: CloudSun, message: 'Pongal in 10 days — stock up on Jaggery, Raw Rice, Cow Ghee, and Turmeric', time: '1 hour ago' },
    { type: 'info', icon: DollarSign, message: 'Koyambedu mandi: Toor Dal dropped ₹8/kg — best time to bulk buy!', time: '2 hours ago' },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function DashboardHome() {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
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

            {/* Alerts */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Important Alerts
                </h3>
                <div className="space-y-3">
                    {alerts.map((a, i) => (
                        <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${a.type === 'critical' ? 'bg-red-50 border-red-200' :
                                a.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                                    'bg-emerald-50 border-emerald-200'
                            }`}>
                            <a.icon className={`w-5 h-5 shrink-0 mt-0.5 ${a.type === 'critical' ? 'text-red-500' :
                                    a.type === 'warning' ? 'text-amber-500' :
                                        'text-emerald-600'
                                }`} />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-700">{a.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{a.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Access</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickLinks.map((link, i) => (
                        <Link key={i} to={link.to}>
                            <motion.div whileHover={{ y: -4, scale: 1.02 }}
                                className="glass-card rounded-2xl p-5 cursor-pointer group">
                                <div className={`w-12 h-12 rounded-2xl ${link.color} flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                                    <link.icon className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{link.label}</h4>
                                <p className="text-xs text-slate-400 mt-1">{link.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
