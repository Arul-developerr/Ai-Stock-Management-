import { motion } from 'framer-motion'
import {
    CloudSun,
    CalendarDays,
    Thermometer,
    Droplets,
    Sun,
    AlertTriangle,
    ArrowUpRight,
} from 'lucide-react'
import {
    AreaChart, Area,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

const weatherForecast = [
    { day: 'Today', temp: '34°C', condition: 'Sunny', icon: Sun, demandNote: 'Buttermilk +80%' },
    { day: 'Tomorrow', temp: '37°C', condition: 'Hot', icon: Thermometer, demandNote: 'Aavin Milk +60%' },
    { day: 'Wed', temp: '39°C', condition: 'Heatwave', icon: Thermometer, demandNote: 'Water +150%' },
    { day: 'Thu', temp: '32°C', condition: 'Cloudy', icon: Droplets, demandNote: 'Tea Dust +30%' },
    { day: 'Fri', temp: '28°C', condition: 'Rain likely', icon: Droplets, demandNote: 'Snacks +45%' },
]

const upcomingEvents = [
    { name: 'Pongal Festival', daysAway: 10, impact: 'Very High', items: 'Jaggery (Vellam), Raw Rice, Cow Ghee (Nei), Turmeric (Manjal), Sugarcane', color: 'from-amber-500 to-orange-500' },
    { name: 'Karthigai Deepam', daysAway: 25, impact: 'High', items: 'Gingelly Oil (Nallennai), Cotton Wicks, Rice Flour, Ghee', color: 'from-orange-500 to-red-500' },
    { name: 'CSK Cricket Match', daysAway: 4, impact: 'Medium', items: 'Murukku, Mixture, Cold drinks, Chips', color: 'from-yellow-500 to-amber-500' },
    { name: 'School Reopening', daysAway: 18, impact: 'Medium', items: 'Biscuits, Juice boxes, Health drinks, Bread', color: 'from-sky-500 to-blue-500' },
]

const demandForecast = [
    { day: 'Mon', predicted: 320, actual: 305 },
    { day: 'Tue', predicted: 380, actual: 370 },
    { day: 'Wed', predicted: 410, actual: 395 },
    { day: 'Thu', predicted: 520, actual: 490 },
    { day: 'Fri', predicted: 680, actual: null },
    { day: 'Sat', predicted: 850, actual: null },
    { day: 'Sun', predicted: 720, actual: null },
]

const stockUpItems = [
    { name: 'Jaggery / Vellam (1kg)', current: 8, needed: 50, urgency: 'high', reason: 'Pongal in 10 days' },
    { name: 'Raw Rice (25kg)', current: 5, needed: 25, urgency: 'high', reason: 'Pongal cooking' },
    { name: 'Cow Ghee / Nei (500ml)', current: 10, needed: 40, urgency: 'high', reason: 'Festival demand' },
    { name: 'Gingelly Oil / Nallennai (1L)', current: 15, needed: 35, urgency: 'medium', reason: 'Karthigai Deepam' },
    { name: 'Turmeric / Manjal Thool (100g)', current: 20, needed: 45, urgency: 'medium', reason: 'Festival cooking' },
    { name: 'Murukku & Mixture packs', current: 12, needed: 30, urgency: 'medium', reason: 'CSK match snacks' },
]

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white rounded-xl px-4 py-3 text-xs border border-slate-200 shadow-lg">
            <p className="font-semibold text-slate-800 mb-1">{label}</p>
            {payload.map((e, i) => (
                <p key={i} style={{ color: e.color }}>{e.name}: {e.value} units</p>
            ))}
        </div>
    )
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function Forecasting() {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-slate-800">What Will Sell Next?</h2>
                <p className="text-sm text-slate-400">AI predicts what customers will buy based on weather, festivals, and local events</p>
            </motion.div>

            {/* Weather Strip */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CloudSun className="w-5 h-5 text-sky-500" />
                    Weather Forecast & Demand Impact
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {weatherForecast.map((w, i) => (
                        <div key={i} className={`rounded-xl p-4 text-center border transition-all ${i === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                            }`}>
                            <p className="text-xs font-semibold text-slate-400 mb-2">{w.day}</p>
                            <w.icon className={`w-8 h-8 mx-auto mb-2 ${i === 2 ? 'text-red-500' : 'text-amber-500'}`} />
                            <p className="text-lg font-bold text-slate-800">{w.temp}</p>
                            <p className="text-xs text-slate-400 mb-2">{w.condition}</p>
                            <div className="px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                                <p className="text-[10px] font-semibold text-emerald-700 flex items-center justify-center gap-1">
                                    <ArrowUpRight className="w-2.5 h-2.5" /> {w.demandNote}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Demand Forecast Chart */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Demand Prediction</h3>
                <p className="text-xs text-slate-400 mb-4">AI predicted vs actual sales (units). Future days are predictions only.</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={demandForecast}>
                            <defs>
                                <linearGradient id="fgPredicted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="fgActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="predicted" stroke="#059669" strokeWidth={2.5}
                                fill="url(#fgPredicted)" name="AI Prediction" dot={{ fill: '#059669', r: 4, stroke: '#fff', strokeWidth: 2 }} />
                            <Area type="monotone" dataKey="actual" stroke="#8b5cf6" strokeWidth={2.5}
                                fill="url(#fgActual)" name="Actual" dot={{ fill: '#8b5cf6', r: 4, stroke: '#fff', strokeWidth: 2 }} connectNulls={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-6 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> AI Prediction</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Actual Sales</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-violet-600" />
                        Upcoming Events Near You
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Festivals & events that will increase customer demand</p>
                    <div className="space-y-3">
                        {upcomingEvents.map((e, i) => (
                            <div key={i} className="rounded-xl bg-slate-50 border border-slate-200 p-4 hover:bg-white hover:shadow-sm transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-bold text-slate-800">{e.name}</h4>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${e.impact === 'Very High' ? 'bg-red-50 text-red-600 border border-red-200' :
                                            e.impact === 'High' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                                                'bg-amber-50 text-amber-600 border border-amber-200'
                                        }`}>{e.impact} Impact</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-1">📅 In {e.daysAway} days</p>
                                <p className="text-xs text-slate-400">📦 Stock up: <span className="text-emerald-700 font-medium">{e.items}</span></p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Stock Up Alert */}
                <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Stock Up Now!
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Based on festivals + weather, you need more of these items</p>
                    <div className="space-y-4">
                        {stockUpItems.map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                    <span className={`text-xs font-semibold ${item.urgency === 'high' ? 'text-red-500' : 'text-amber-500'
                                        }`}>{item.current}/{item.needed}</span>
                                </div>
                                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.current / item.needed) * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={`h-full rounded-full ${item.urgency === 'high'
                                                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                                : 'bg-gradient-to-r from-amber-400 to-yellow-400'
                                            }`}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400">Reason: {item.reason}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
