function Pastor() {
  return (
    <div className="main-content">
      <div className="card" style={{ maxWidth: '800px', margin: '20px auto' }}>
        <div className="card-header">👤 Meet Our Pastor</div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ width: '150px', height: '150px', background: 'var(--green-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: 'var(--green)', marginBottom: '8px' }}>Pastor Talagi</h2>
              <p style={{ color: 'var(--gold-dark)', fontWeight: '600', marginBottom: '16px' }}>Minister, Sandringham Presbyterian Church</p>
              <p style={{ fontSize: '14px', color: 'var(--grey-text)', lineHeight: '1.8' }}>
                Pastor Talagi leads our congregation with compassion, wisdom, and a deep commitment to serving the Sandringham community. With a heart for pastoral care and community outreach, Pastor Talagi guides our church family in worship, discipleship, and service.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '24px', padding: '20px', background: 'var(--gold-light)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
            <h3 style={{ color: 'var(--green)', marginBottom: '12px' }}>Our Mission</h3>
            <p style={{ fontSize: '14px', color: 'var(--dark)', lineHeight: '1.8' }}>
              To glorify God by making disciples of all nations, nurturing a loving and inclusive community of faith, and serving the people of Sandringham and Auckland with the love of Christ.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pastor