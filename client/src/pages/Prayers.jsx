import { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Prayers() {
  const { user } = useAuth()
  const [prayers, setPrayers] = useState([])
  const [form, setForm] = useState({ description: '', visibility: 'private' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPrayers = async () => {
    try {
      const res = await api.get('/prayers/my')
      setPrayers(res.data.prayers)
    } catch {}
  }

  useEffect(() => { fetchPrayers() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/prayers', form)
      setStatus('success')
      setForm({ description: '', visibility: 'private' })
      fetchPrayers()
    } catch (err) {
      setStatus('error')
    } finally { setLoading(false) }
  }

  return (
    <div className="main-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--green)', marginBottom: '16px' }}>🙏 Prayer Requests</h2>
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header">Submit a Prayer Request</div>
        <div style={{ padding: '20px' }}>
          {status === 'success' && <div className="success" style={{ padding: '10px', background: '#f0fff4', borderRadius: '4px', marginBottom: '12px' }}>✓ Prayer request submitted successfully.</div>}
          {status === 'error' && <div className="error" style={{ padding: '10px', background: '#fff5f5', borderRadius: '4px', marginBottom: '12px' }}>Failed to submit. Please try again.</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Prayer Request <span style={{ color: 'var(--grey-text)', fontWeight: 'normal' }}>({form.description.length}/500)</span></label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={4} maxLength={500} placeholder="Share your prayer request here..." />
            </div>
            <div className="form-group">
              <label>Visibility</label>
              <select value={form.visibility} onChange={e => setForm({...form, visibility: e.target.value})}>
                <option value="private">Private — Pastor only</option>
                <option value="shared">Shared — with congregation</option>
              </select>
            </div>
            <button type="submit" className="btn btn-green" style={{ width: '100%', padding: '12px' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Prayer Request'}
            </button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-header">My Prayer Requests</div>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {prayers.length === 0 ? <p style={{ color: 'var(--grey-text)', textAlign: 'center', padding: '20px' }}>No prayer requests yet.</p> : prayers.map(p => (
            <div key={p.id} style={{ padding: '12px', background: 'var(--grey-bg)', borderRadius: '6px', borderLeft: `3px solid ${p.status === 'approved' ? 'var(--green)' : p.status === 'declined' ? '#dc3545' : 'var(--gold)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--grey-text)' }}>{new Date(p.created_at).toLocaleDateString('en-NZ')}</span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: p.status === 'approved' ? 'var(--green)' : p.status === 'declined' ? '#dc3545' : 'var(--gold-dark)' }}>{p.status.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--dark)' }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Prayers