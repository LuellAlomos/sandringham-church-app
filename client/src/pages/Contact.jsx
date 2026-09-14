import { useState } from 'react'
import api from '../services/api'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content">
      <div className="card" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <div className="card-header">✉ Contact Us</div>
        <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '14px', color: 'var(--grey-text)', marginBottom: '20px' }}>
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
          {status === 'success' && <div className="success" style={{ padding: '12px', background: '#f0fff4', borderRadius: '4px', marginBottom: '16px' }}>✓ Message sent successfully! We'll be in touch soon.</div>}
          {status === 'error' && <div className="error" style={{ padding: '12px', background: '#fff5f5', borderRadius: '4px', marginBottom: '16px' }}>Failed to send message. Please try again.</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="John Smith" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="How can we help you?" rows={5} />
            </div>
            <button type="submit" className="btn btn-green" style={{ width: '100%', padding: '12px' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact