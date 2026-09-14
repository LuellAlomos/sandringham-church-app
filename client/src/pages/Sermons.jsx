import { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Sermons() {
  const { user } = useAuth()
  const [sermons, setSermons] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', preacher: 'Pastor Talagi', series: '', sermon_date: '', description: '', media_url: '' })

  const fetchSermons = async () => {
    try {
      const res = await api.get(`/sermons${keyword ? `?keyword=${keyword}` : ''}`)
      setSermons(res.data.sermons)
    } catch {} finally { setLoading(false) }
  }

  useEffect(() => { fetchSermons() }, [keyword])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/sermons', form)
      setShowForm(false)
      setForm({ title: '', preacher: 'Pastor Talagi', series: '', sermon_date: '', description: '', media_url: '' })
      fetchSermons()
    } catch (err) { alert(err.response?.data?.message || 'Failed to create sermon') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this sermon?')) return
    await api.delete(`/sermons/${id}`)
    fetchSermons()
  }

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: 'var(--green)' }}>📖 Sermon Library</h2>
        {user?.role === 'admin' && <button className="btn btn-green" onClick={() => setShowForm(!showForm)}>+ Add Sermon</button>}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <input type="text" placeholder="Search sermons by title, preacher or series..." value={keyword} onChange={e => setKeyword(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--grey-border)', borderRadius: '6px', fontSize: '14px' }} />
      </div>
      {showForm && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="card-header">Add New Sermon</div>
          <form onSubmit={handleCreate} style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group"><label>Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
            <div className="form-group"><label>Preacher</label><input value={form.preacher} onChange={e => setForm({...form, preacher: e.target.value})} required /></div>
            <div className="form-group"><label>Series</label><input value={form.series} onChange={e => setForm({...form, series: e.target.value})} /></div>
            <div className="form-group"><label>Date</label><input type="date" value={form.sermon_date} onChange={e => setForm({...form, sermon_date: e.target.value})} required /></div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Media URL (YouTube/SoundCloud)</label><input value={form.media_url} onChange={e => setForm({...form, media_url: e.target.value})} required placeholder="https://youtube.com/watch?v=..." /></div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} /></div>
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-green">Save Sermon</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <p>Loading sermons...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
          {sermons.length === 0 ? <p style={{ color: 'var(--grey-text)' }}>No sermons found.</p> : sermons.map(s => (
            <div key={s.id} className="card">
              <div style={{ background: 'var(--green-light)', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>▶</div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ color: 'var(--dark)', marginBottom: '4px', fontSize: '14px' }}>{s.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--grey-text)', marginBottom: '4px' }}>{s.preacher} · {new Date(s.sermon_date).toLocaleDateString('en-NZ')}</p>
                {s.series && <p style={{ fontSize: '11px', color: 'var(--gold-dark)', marginBottom: '8px' }}>Series: {s.series}</p>}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <a href={s.media_url} target="_blank" rel="noreferrer" className="btn btn-green" style={{ fontSize: '12px', padding: '5px 10px', textDecoration: 'none' }}>▶ Play</a>
                  {user?.role === 'admin' && <button className="btn btn-danger" style={{ fontSize: '12px', padding: '5px 10px' }} onClick={() => handleDelete(s.id)}>Delete</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Sermons