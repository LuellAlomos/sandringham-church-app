import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Dashboard() {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get('/announcements').then(res => setAnnouncements(res.data.announcements)).catch(() => {})
    api.get('/events').then(res => setEvents(res.data.events)).catch(() => {})
  }, [])

  return (
    <div className="page-layout">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="card">
          <div className="card-header">☰ Member Menu</div>
          <div style={{ padding: '8px' }}>
            {[['/', '🏠 Home'], ['/dashboard', '📊 Dashboard'], ['/sermons', '📖 Sermons'], ['/events', '📅 Events'], ['/prayers', '🙏 Prayers']].map(([path, label]) => (
              <Link key={path} to={path} style={{ display: 'block', padding: '8px 10px', color: 'var(--dark)', textDecoration: 'none', borderRadius: '6px', fontSize: '13px', marginBottom: '2px' }}>{label}</Link>
            ))}
            {user?.role === 'admin' && <Link to="/admin" style={{ display: 'block', padding: '8px 10px', color: 'var(--gold-dark)', textDecoration: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>⚙ Admin Panel</Link>}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ background: 'var(--green)', padding: '16px', borderRadius: '8px', color: 'white' }}>
          <h2 style={{ fontSize: '18px' }}>Welcome back, {user?.full_name}! 👋</h2>
          <p style={{ color: 'var(--gold-light)', fontSize: '13px', marginTop: '4px' }}>Sunday service — 10:00am every week</p>
        </div>
        <div className="card">
          <div className="card-header">📢 Latest Announcements</div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {announcements.length === 0 ? <p style={{ fontSize: '13px', color: 'var(--grey-text)', textAlign: 'center', padding: '20px' }}>No announcements yet.</p> : announcements.map(a => (
              <div key={a.id} style={{ padding: '12px', background: 'var(--grey-bg)', borderRadius: '6px', borderLeft: '3px solid var(--green)' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--dark)', marginBottom: '4px' }}>{a.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--grey-text)' }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="card">
          <div className="card-header">📅 Upcoming Events</div>
          <div style={{ padding: '8px' }}>
            {events.slice(0, 3).map(e => (
              <div key={e.id} style={{ padding: '8px', borderBottom: '0.5px solid var(--grey-border)' }}>
                <div style={{ background: 'var(--green)', color: 'var(--gold)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block', marginBottom: '4px' }}>{new Date(e.event_date).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' })}</div>
                <div style={{ fontSize: '12px', fontWeight: '600' }}>{e.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--grey-text)' }}>🕐 {e.start_time}</div>
              </div>
            ))}
            <Link to="/events" style={{ display: 'block', textAlign: 'center', padding: '8px', color: 'var(--green)', fontSize: '12px', textDecoration: 'none' }}>See all events →</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">⚡ Quick Actions</div>
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/prayers" className="btn btn-green" style={{ textAlign: 'center', textDecoration: 'none', padding: '10px' }}>🙏 Submit Prayer Request</Link>
            <Link to="/sermons" className="btn btn-outline" style={{ textAlign: 'center', textDecoration: 'none', padding: '10px' }}>📖 Browse Sermons</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard