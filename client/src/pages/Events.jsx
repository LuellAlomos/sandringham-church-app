import { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Events() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', event_date: '', start_time: '', end_time: '', location: '' })
  const [rsvped, setRsvped] = useState({})

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events')
      setEvents(res.data.events)
    } catch {}
  }

  useEffect(() => { fetchEvents() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/events', form)
      setShowForm(false)
      setForm({ title: '', description: '', event_date: '', start_time: '', end_time: '', location: '' })
      fetchEvents()
    } catch (err) { alert(err.response?.data?.message || 'Failed') }
  }

  const handleRsvp = async (id) => {
    try {
      if (rsvped[id]) {
        await api.delete(`/events/${id}/rsvp`)
        setRsvped({ ...rsvped, [id]: false })
      } else {
        await api.post(`/events/${id}/rsvp`)
        setRsvped({ ...rsvped, [id]: true })
      }
    } catch (err) { alert(err.response?.data?.message || 'RSVP failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    await api.delete(`/events/${id}`)
    fetchEvents()
  }

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: 'var(--green)' }}>📅 Events</h2>
        {user?.role === 'admin' && <button className="btn btn-green" onClick={() => setShowForm(!showForm)}>+ Add Event</button>}
      </div>
      {showForm && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="card-header">Add New Event</div>
          <form onSubmit={handleCreate} style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
            <div className="form-group"><label>Date</label><input type="date" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} required /></div>
            <div className="form-group"><label>Start Time</label><input type="time" value={form.start_time} onChange={e => setForm({...form, start_time: e.target.value})} required /></div>
            <div className="form-group"><label>End Time</label><input type="time" value={form.end_time} onChange={e => setForm({...form, end_time: e.target.value})} /></div>
            <div className="form-group"><label>Location</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} /></div>
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-green">Save Event</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.length === 0 ? <p style={{ color: 'var(--grey-text)' }}>No upcoming events.</p> : events.map(e => (
          <div key={e.id} className="card">
            <div style={{ background: 'var(--green)', padding: '10px 14px' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '15px' }}>{e.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>{e.description}</p>
            </div>
            <div style={{ padding: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--grey-text)' }}>📅 {new Date(e.event_date).toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              <span style={{ fontSize: '13px', color: 'var(--grey-text)' }}>🕐 {e.start_time}{e.end_time ? ` – ${e.end_time}` : ''}</span>
              {e.location && <span style={{ fontSize: '13px', color: 'var(--grey-text)' }}>📍 {e.location}</span>}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                <button className={`btn ${rsvped[e.id] ? 'btn-outline' : 'btn-green'}`} onClick={() => handleRsvp(e.id)} style={{ fontSize: '13px' }}>
                  {rsvped[e.id] ? '✓ RSVPd' : 'RSVP'}
                </button>
                {user?.role === 'admin' && <button className="btn btn-danger" style={{ fontSize: '13px' }} onClick={() => handleDelete(e.id)}>Delete</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events