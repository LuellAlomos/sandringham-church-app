import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Sermons from './pages/Sermons'
import Events from './pages/Events'
import Prayers from './pages/Prayers'
import AdminPanel from './pages/AdminPanel'
import Pastor from './pages/Pastor'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '48px' }}>✝</div>
      <p style={{ color: 'var(--green)', fontSize: '16px' }}>Loading...</p>
    </div>
  )
  if (!user) return <Navigate to="/login" />
  return children
}

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="loading">Loading...</div>
  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" />
  return children
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastor" element={<Pastor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sermons" element={<ProtectedRoute><Sermons /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/prayers" element={<ProtectedRoute><Prayers /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </div>
  )
}

export default App