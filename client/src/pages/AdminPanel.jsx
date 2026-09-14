import { useState, useEffect } from 'react'
import api from '../services/api'

function AdminPanel() {
  const [prayers, setPrayers] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [tab, setTab] = useState('prayers')
  const [form, setForm] = useState({ title: '', body: '' })

  const fetchData = async () => {
    try {
      const [p, a] = await Promise.all([
        api.get('/prayers?status=pending'),
        api.get('/announcements')
      ])
      setPrayers(p.data.prayers)
      setAnnouncements(a.data.announcements)
    } catch {}
  }

  useEffect(() => { fetchData() }, [])

  const handleModerate = async (id, status) => {
    try {
      await api.patch(`/prayers/${id}`, { status })
      fetchData()
    } catch (err) { alert('Failed to moderate prayer request') }
  }

  const handleAnnouncement = async (e) => {
    e.preventDefault()
    try {
      await api.post('/announcements', form)
      setForm({ title: '', body: '' })
      fetchData()
    } catch {}
  }

  const handleDeleteAnnouncement = async (id) => {
    if (!confirm('Delete this announcement?')) return
    await api.delete(`/announcements/${id}`)
    fetchData()
  }

  return (
    <div className="main-content">
      <h2 style={{ color: 'var(--green)', marginBottom: '16px' }}>⚙ Admin Panel</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['prayers', 'announcements'].map(t => (
          <button key={t} className={`btn ${tab === t ? 'btn-green' : 'btn-outline'}`} onClick={() => setTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>
      {tab === 'prayers' && (
        <div>
          <h3 style={{ marginBottom: '12px', color: 'var(--green)' }}>Pending Prayer Requests ({prayers.length})</h3>
          {prayers.length === 0 ? <p style={{ color: 'var(--grey-text)' }}>No pending prayer requests.</p> : prayers.map(p => (
            <div key={p.id} className="card" style={{ marginBottom: '10px' }}>
              <div style={{ padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>{p.full_name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--grey-text)' }}>{p.visibility} · {new Date(p.created_at).toLocaleDateString('en-NZ')}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--dark)', marginBottom: '12px' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-green" style={{ fontSize: '12px' }} onClick={() => handleModerate(p.id, 'approved')}>✓ Approve</button>
                  <button className="btn btn-danger" style={{ fontSize: '12px' }} onClick={() => handleModerate(p.id, 'declined')}>✗ Decline</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 'announcements' && (
        <div>
          <div className="card" style={{ marginBottom: '16px' }}>
            <div className="card-header">Post New Announcement</div>
            <form onSubmit={handleAnnouncement} style={{ padding: '16px' }}>
              <div className="form-group"><label>Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
              <div className="form-group"><label>Body</label><textarea value={form.body} onChange={e => setForm({...form, body: e.target.value})} required rows={4} /></div>
              <button type="submit" className="btn btn-green">Post Announcement</button>
            </form>
          </div>
          <h3 style={{ marginBottom: '12px', color: 'var(--green)' }}>Current Announcements</h3>
          {announcements.map(a => (
            <div key={a.id} className="card" style={{ marginBottom: '10px' }}>
              <div style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{a.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--grey-text)' }}>{a.body}</p>
                </div>
                <button className="btn btn-danger" style={{ fontSize: '12px', flexShrink: 0, marginLeft: '12px' }} onClick={() => handleDeleteAnnouncement(a.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPanel