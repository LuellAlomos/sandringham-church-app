import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav style={{ background: 'var(--green)', borderBottom: '3px solid var(--gold)', padding: '0 16px', height: '52px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        <div style={{ width: '34px', height: '34px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', fontWeight: 'bold', fontSize: '16px' }}>✝</div>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', display: 'block' }}>Sandringham Presbyterian</Link>
          <span style={{ color: 'var(--gold-light)', fontSize: '10px' }}>Auckland, New Zealand</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--gold-light)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
        <Link to="/pastor" style={{ color: 'var(--gold-light)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Pastor</Link>
        <Link to="/events" style={{ color: 'var(--gold-light)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Events</Link>
        <Link to="/sermons" style={{ color: 'var(--gold-light)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Sermons</Link>
        <Link to="/contact" style={{ color: 'var(--gold-light)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Contact</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'var(--gold-light)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Dashboard</Link>
            {user.role === 'admin' && <Link to="/admin" style={{ color: 'var(--gold)', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>Admin</Link>}
            <button onClick={handleLogout} className="btn btn-outline" style={{ color: 'var(--gold-light)', borderColor: 'var(--gold-light)', fontSize: '13px', padding: '5px 12px' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ background: 'var(--gold)', color: 'var(--green)', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar