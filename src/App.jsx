import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import DashboardHome from './pages/DashboardHome'
import Sales from './pages/Sales'
import Bundling from './pages/Bundling'
import Forecasting from './pages/Forecasting'
import DeadStock from './pages/DeadStock'
import Supplier from './pages/Supplier'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Page — First Page (Default Route) */}
        <Route path="/" element={<AuthPage />} />

        {/* Public Landing Page (after login) */}
        <Route path="/home" element={<Landing />} />

        {/* Dashboard with Sidebar Layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="sales" element={<Sales />} />
          <Route path="bundling" element={<Bundling />} />
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="deadstock" element={<DeadStock />} />
          <Route path="supplier" element={<Supplier />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
