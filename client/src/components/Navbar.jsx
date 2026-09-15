import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [hoveredLink, setHoveredLink] = useState(null)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const navLinkStyle = (path) => ({
    color: isActive(path) ? 'var(--gold)' : 'var(--gold-light)',
    padding: '6px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: isActive(path) ? '600' : '400',
    background: isActive(path) ? 'rgba(201,150,42,0.15)' : hoveredLink === path ? 'rgba(255,255,255,0.08)' : 'transparent',
    transition: 'all 0.2s ease',
    borderBottom: isActive(path) ? '2px solid var(--gold)' : '2px solid transparent',
  })

  return (
    <nav style={{
      background: 'var(--green)',
      borderBottom: '3px solid var(--gold)',
      padding: '0 20px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, textDecoration: 'none' }}>
        <div style={{
          width: '38px', height: '38px',
          background: 'var(--gold)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--green)', fontWeight: 'bold', fontSize: '18px',
          boxShadow: '0 2px 8px rgba(201,150,42,0.4)',
          transition: 'transform 0.2s ease',
        }}>✝</div>
        <div>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', lineHeight: 1.2 }}>
            Sandringham Presbyterian
          </div>
          <div style={{ color: 'var(--gold-light)', fontSize: '10px', letterSpacing: '0.5px' }}>
            Auckland, New Zealand
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {[
          ['/', 'Home'],
          ['/pastor', 'Pastor'],
          ['/events', 'Events'],
          ['/sermons', 'Sermons'],
          ['/contact', 'Contact'],
        ].map(([path, label]) => (
          <Link
            key={path}
            to={path}
            style={navLinkStyle(path)}
            onMouseEnter={() => setHoveredLink(path)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <>
            <Link
              to="/dashboard"
              style={navLinkStyle('/dashboard')}
              onMouseEnter={() => setHoveredLink('/dashboard')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Dashboard
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                style={{
                  ...navLinkStyle('/admin'),
                  color: 'var(--gold)',
                  fontWeight: '600'
                }}
                onMouseEnter={() => setHoveredLink('/admin')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                ⚙ Admin
              </Link>
            )}
            <div style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--gold-light)', fontSize: '12px' }}>
                👋 {user.full_name?.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(201,150,42,0.6)',
                  color: 'var(--gold-light)',
                  padding: '5px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(201,150,42,0.2)'
                  e.target.style.borderColor = 'var(--gold)'
                  e.target.style.color = 'var(--gold)'
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = 'rgba(201,150,42,0.6)'
                  e.target.style.color = 'var(--gold-light)'
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              marginLeft: '8px',
              background: 'var(--gold)',
              color: 'var(--green)',
              padding: '7px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(201,150,42,0.3)',
            }}
            onMouseEnter={e => {
              e.target.style.background = '#d4a030'
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 4px 12px rgba(201,150,42,0.4)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'var(--gold)'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 2px 8px rgba(201,150,42,0.3)'
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar