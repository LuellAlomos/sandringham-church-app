import { Routes, Route } from 'react-router-dom'
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

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{textAlign:'center',padding:'40px',color:'#2D5016'}}>Loading...</div>
  if (!user) return <Login />
  return children
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{textAlign:'center',padding:'40px',color:'#2D5016'}}>Loading...</div>
  if (!user || user.role !== 'admin') return <Dashboard />
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
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App