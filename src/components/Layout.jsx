import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart3,
    LayoutDashboard,
    ShoppingCart,
    CloudSun,
    PackageX,
    DollarSign,
    TrendingUp,
    Menu,
    X,
    Home,
    Bell,
} from 'lucide-react'

const sidebarLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/dashboard/sales', icon: TrendingUp, label: 'Sales Report' },
    { to: '/dashboard/bundling', icon: ShoppingCart, label: 'Combo Offers' },
    { to: '/dashboard/forecasting', icon: CloudSun, label: 'What Will Sell?' },
    { to: '/dashboard/deadstock', icon: PackageX, label: 'Slow Items' },
    { to: '/dashboard/supplier', icon: DollarSign, label: 'Best Prices' },
]

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    const currentLabel = (() => {
        const exact = sidebarLinks.find(l => l.end && location.pathname === l.to)
        if (exact) return exact.label
        const match = sidebarLinks.find(l => !l.end && location.pathname.startsWith(l.to))
        return match?.label || 'Dashboard'
    })()

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* ===== SIDEBAR (Desktop) ===== */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed top-0 left-0 h-full z-40">
                {/* Logo */}
                <div className="px-6 py-5 border-b border-slate-100">
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-slate-800">Stock<span className="text-emerald-600">AI</span></span>
                            <p className="text-[10px] text-slate-400 -mt-0.5">Smart Maligai Manager</p>
                        </div>
                    </a>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Menu</p>
                    {sidebarLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                }`
                            }>
                            <link.icon className="w-[18px] h-[18px]" />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Tip */}
                <div className="px-4 py-4 border-t border-slate-100">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                        <p className="text-xs font-semibold text-emerald-700">💡 Tip</p>
                        <p className="text-[10px] text-emerald-600/70 mt-1">Check "What Will Sell?" daily for festival planning!</p>
                    </div>
                </div>
            </aside>

            {/* ===== MOBILE SIDEBAR ===== */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-40 lg:hidden" />
                        <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 lg:hidden flex flex-col shadow-xl">
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                                        <BarChart3 className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-slate-800">Stock<span className="text-emerald-600">AI</span></span>
                                </div>
                                <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                                {sidebarLinks.map((link) => (
                                    <NavLink key={link.to} to={link.to} end={link.end}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                            }`
                                        }>
                                        <link.icon className="w-[18px] h-[18px]" />
                                        {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* ===== MAIN CONTENT ===== */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-slate-700">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800">{currentLabel}</h1>
                            <p className="text-xs text-slate-400">Welcome back, Shop Owner 👋</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                            <Bell className="w-4 h-4" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">3</span>
                        </button>
                        <NavLink to="/"
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                            <Home className="w-4 h-4" />
                        </NavLink>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
