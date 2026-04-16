import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const groceryItems = [
  { emoji: '🍞', name: 'Bread', size: 'text-4xl' },
  { emoji: '🥜', name: 'Peanut Butter', size: 'text-3xl' },
  { emoji: '🥛', name: 'Milk', size: 'text-4xl' },
  { emoji: '🥦', name: 'Broccoli', size: 'text-3xl' },
  { emoji: '🥫', name: 'Canned Goods', size: 'text-3xl' },
  { emoji: '🍎', name: 'Apple', size: 'text-4xl' },
  { emoji: '🧀', name: 'Cheese', size: 'text-3xl' },
  { emoji: '🥕', name: 'Carrot', size: 'text-4xl' },
  { emoji: '🍇', name: 'Grapes', size: 'text-3xl' },
  { emoji: '🥚', name: 'Eggs', size: 'text-3xl' },
  { emoji: '🍌', name: 'Banana', size: 'text-4xl' },
  { emoji: '🫑', name: 'Pepper', size: 'text-3xl' },
  { emoji: '🥩', name: 'Meat', size: 'text-4xl' },
  { emoji: '🍅', name: 'Tomato', size: 'text-3xl' },
  { emoji: '🥑', name: 'Avocado', size: 'text-3xl' },
  { emoji: '🧈', name: 'Butter', size: 'text-4xl' },
]

function FloatingGroceryRow({ items, duration, reverse = false, top }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="absolute left-0 w-[200%] flex items-center gap-16 whitespace-nowrap pointer-events-none select-none"
      style={{ top }}
    >
      <div
        className={`flex items-center gap-16 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`${item.size} opacity-20 drop-shadow-lg`}>
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d9488]">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d9488]">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d9488]">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d9488]">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  )
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6db5a0]">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6db5a0]">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  )
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showCreatePassword, setShowCreatePassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setIsLogin(true)
  }

  const row1 = groceryItems.slice(0, 8)
  const row2 = groceryItems.slice(4, 12)
  const row3 = groceryItems.slice(8, 16)
  const row4 = groceryItems.slice(0, 6).concat(groceryItems.slice(10, 16))
  const row5 = groceryItems.slice(2, 10)

  const formVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      x: -30,
      scale: 0.97,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* ============ LEFT PANEL ============ */}
      <div className="relative w-full lg:w-1/2 min-h-[280px] lg:min-h-screen auth-left-gradient overflow-hidden flex items-center justify-center">
        {/* Animated grocery rows */}
        <div className="absolute inset-0 overflow-hidden" style={{ transform: 'rotate(-15deg) scale(1.5)', transformOrigin: 'center center' }}>
          <FloatingGroceryRow items={row1} duration={45} top="5%" />
          <FloatingGroceryRow items={row2} duration={55} reverse top="22%" />
          <FloatingGroceryRow items={row3} duration={50} top="39%" />
          <FloatingGroceryRow items={row4} duration={60} reverse top="56%" />
          <FloatingGroceryRow items={row5} duration={48} top="73%" />
          <FloatingGroceryRow items={[...row1].reverse()} duration={52} reverse top="90%" />
        </div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857]/30 to-transparent" />

        {/* Text content */}
        <div className="relative z-10 px-8 md:px-14 lg:px-16 py-12 lg:py-0 max-w-xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo / Brand Mark */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <span className="text-white/90 font-bold text-xl tracking-wide">StockAI</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
              Smart Stock Management
              <span className="block mt-1 text-emerald-100">
                & AI Insights
              </span>
            </h1>

            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Optimize your retail business with AI-driven demand forecasting, real-time inventory tracking, and dynamic expiry management. Manage your stock smarter.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-8">
              {['AI Forecasting', 'Real-time Tracking', 'Smart Bundling', 'Expiry Alerts'].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white/90 border border-white/20"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ RIGHT PANEL ============ */}
      <div className="relative w-full lg:w-1/2 min-h-screen bg-white flex items-center justify-center px-6 py-12 lg:py-0">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />



        <div className="relative z-10 w-full max-w-md">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Login Form */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#059669] mb-2">
                    RETAIL SELLER LOGIN
                  </h2>
                  <p className="text-sm text-gray-400">Welcome back! Sign in to manage your inventory</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5" id="login-form">
                  {/* Email */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110">
                      <MailIcon />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#ecfdf5] text-gray-700 placeholder-[#6db5a0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#059669]/30 transition-all duration-300"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110">
                      <LockIcon />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 rounded-full bg-[#ecfdf5] text-gray-700 placeholder-[#6db5a0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#059669]/30 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>

                  {/* Options row */}
                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none" id="remember-me-label">
                      <div
                        onClick={() => setRememberMe(!rememberMe)}
                        className={`w-4 h-4 rounded border-2 transition-all duration-300 flex items-center justify-center cursor-pointer ${rememberMe ? 'bg-[#059669] border-[#059669]' : 'border-gray-300 bg-white'}`}
                      >
                        {rememberMe && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">Remember me</span>
                    </label>
                    <a href="#" className="text-xs text-[#059669]/70 hover:text-[#059669] transition-colors" id="forgot-password-link">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    id="login-button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-full auth-btn-gradient text-white font-bold text-sm tracking-widest hover:brightness-105 transition-all duration-300 cursor-pointer"
                  >
                    LOGIN
                  </motion.button>
                </form>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-gray-400">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-[#059669] font-semibold hover:underline cursor-pointer"
                    id="switch-to-register"
                  >
                    Register
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Register Form */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#059669] mb-2">
                    CREATE RETAIL ACCOUNT
                  </h2>
                  <p className="text-sm text-gray-400">Start managing your inventory smarter today</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5" id="register-form">
                  {/* Store Name */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110">
                      <StoreIcon />
                    </div>
                    <input
                      id="register-name"
                      type="text"
                      placeholder="Store Name / Full Name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#ecfdf5] text-gray-700 placeholder-[#6db5a0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#059669]/30 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110">
                      <MailIcon />
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      placeholder="Email Address"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#ecfdf5] text-gray-700 placeholder-[#6db5a0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#059669]/30 transition-all duration-300"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110">
                      <LockIcon />
                    </div>
                    <input
                      id="register-password"
                      type={showCreatePassword ? 'text' : 'password'}
                      placeholder="Create Password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 rounded-full bg-[#ecfdf5] text-gray-700 placeholder-[#6db5a0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#059669]/30 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePassword(!showCreatePassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      <EyeIcon open={showCreatePassword} />
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {regPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-1"
                    >
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                              regPassword.length >= level * 3
                                ? level <= 2 ? 'bg-amber-400' : 'bg-emerald-400'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] mt-1 text-gray-400">
                        {regPassword.length < 6 ? 'Weak' : regPassword.length < 10 ? 'Good' : 'Strong'} password
                      </p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    id="register-button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-full auth-btn-gradient text-white font-bold text-sm tracking-widest hover:brightness-105 transition-all duration-300 cursor-pointer"
                  >
                    REGISTER
                  </motion.button>
                </form>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-[#059669] font-semibold hover:underline cursor-pointer"
                    id="switch-to-login"
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
