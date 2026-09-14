import { Link } from 'react-router-dom'
import churchHero from '../assets/church-hero.jpg'
import communityImg from '../assets/community.jpg'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(45,80,22,0.55), rgba(45,80,22,0.7)), url(${churchHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        textAlign: 'center',
        borderBottom: '3px solid var(--gold)'
      }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '14px', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          ✝ Sundays at 10:00am
        </div>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', lineHeight: 1.3 }}>
          Fakaalofa atu
        </h1>
        <h2 style={{ color: 'var(--gold-light)', fontSize: '22px', fontWeight: 'normal', marginBottom: '8px' }}>
          Welcome to Sandringham Presbyterian Church
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          A community of Niuean faith in the heart of Auckland.<br />Ko e lotu fakalelei — All are welcome here.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-gold" style={{ padding: '12px 28px', fontSize: '15px' }}>
            Join Our Community
          </Link>
          <Link to="/sermons" style={{
            background: 'transparent', color: 'white',
            border: '1.5px solid rgba(255,255,255,0.6)',
            padding: '12px 28px', borderRadius: '6px',
            textDecoration: 'none', fontSize: '15px'
          }}>
            Watch Sermons
          </Link>
        </div>
      </div>

      {/* Service Times Banner */}
      <div style={{ background: 'var(--gold)', padding: '16px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--green)', fontWeight: 'bold', fontSize: '15px', margin: 0 }}>
          📍 Sandringham, Auckland &nbsp;|&nbsp; 🕐 Sundays 10:00am &nbsp;|&nbsp; ✉ john.aholima@hotmail.com
        </p>
      </div>

      {/* Feature Cards */}
      <div style={{ padding: '48px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--green)', marginBottom: '8px', fontSize: '26px' }}>
          Our Community
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--grey-text)', marginBottom: '36px', fontSize: '14px' }}>
          Serving the Niuean community and all people of Auckland with love and faith
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { icon: '📅', title: 'Sunday Services', desc: 'Join us every Sunday at 10:00am for worship, fellowship, and the Word of God. All are welcome regardless of background.', link: '/events', label: 'View events →' },
            { icon: '📖', title: 'Sermon Library', desc: 'Access recordings of past sermons from Pastor Talagi. Search by series, date, or topic and grow in faith at your own pace.', link: '/sermons', label: 'Browse sermons →' },
            { icon: '🙏', title: 'Prayer & Pastoral Care', desc: 'Submit a prayer request and our pastoral team will pray with you. Your requests are handled with care and confidentiality.', link: '/login', label: 'Submit a request →' },
          ].map(card => (
            <div key={card.title} className="card" style={{ transition: 'transform 0.2s' }}>
              <div style={{ background: 'var(--green)', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>{card.icon}</div>
                <h3 style={{ color: 'var(--gold)', fontSize: '16px' }}>{card.title}</h3>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '13px', color: 'var(--grey-text)', lineHeight: 1.7, marginBottom: '12px' }}>{card.desc}</p>
                <Link to={card.link} style={{ color: 'var(--green)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>{card.label}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scripture Banner */}
      <div style={{ background: 'var(--green)', padding: '48px 20px', textAlign: 'center', borderTop: '3px solid var(--gold)', borderBottom: '3px solid var(--gold)' }}>
        <p style={{ color: 'var(--gold-light)', fontSize: '20px', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto 12px', lineHeight: 1.7 }}>
          "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
        </p>
        <p style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '14px' }}>— Jeremiah 29:11</p>
      </div>
{/* Storytelling Section */}
<div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
  <h2 style={{ textAlign: 'center', color: 'var(--green)', fontSize: '28px', marginBottom: '8px' }}>Our Community</h2>
  <p style={{ textAlign: 'center', color: 'var(--grey-text)', fontSize: '14px', marginBottom: '56px' }}>
    Serving the Niuean community and all people of Auckland with love and faith
  </p>

  {/* Story Block 1 — Image Left, Text Right */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '72px' }}>
    <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(45,80,22,0.15)' }}>
      <img src={communityImg} alt="Our community united in faith" style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }} />
    </div>
    <div>
      <div style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>✝ Who We Are</div>
      <h3 style={{ color: 'var(--green)', fontSize: '26px', lineHeight: 1.3, marginBottom: '16px' }}>
        United in Faith,<br />Rooted in Culture
      </h3>
      <p style={{ color: 'var(--grey-text)', fontSize: '14px', lineHeight: 1.9, marginBottom: '16px' }}>
        Sandringham Presbyterian Church is a vibrant Niuean Christian community in the heart of Auckland. We are a congregation that proudly celebrates our Pacific heritage while warmly welcoming all people to worship alongside us.
      </p>
      <p style={{ color: 'var(--grey-text)', fontSize: '14px', lineHeight: 1.9, marginBottom: '24px' }}>
        Our faith is at the centre of everything we do — from Sunday worship to community outreach, from youth programmes to pastoral care. We believe that together, we are stronger.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--green)' }}>10+</div>
          <div style={{ fontSize: '12px', color: 'var(--grey-text)' }}>Years of Service</div>
        </div>
        <div style={{ width: '1px', background: 'var(--grey-border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--green)' }}>100+</div>
          <div style={{ fontSize: '12px', color: 'var(--grey-text)' }}>Congregation Members</div>
        </div>
        <div style={{ width: '1px', background: 'var(--grey-border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--green)' }}>7</div>
          <div style={{ fontSize: '12px', color: 'var(--grey-text)' }}>Days a Week</div>
        </div>
      </div>
    </div>
  </div>

  {/* Story Block 2 — Text Left, Image Right */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '72px' }}>
    <div>
      <div style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>✝ Our Pastor</div>
      <h3 style={{ color: 'var(--green)', fontSize: '26px', lineHeight: 1.3, marginBottom: '16px' }}>
        Led with Compassion<br />and Purpose
      </h3>
      <p style={{ color: 'var(--grey-text)', fontSize: '14px', lineHeight: 1.9, marginBottom: '16px' }}>
        Under the pastoral leadership of Pastor Talagi, our church family is guided with wisdom, love, and a deep commitment to the Word of God. Pastor Talagi brings a heart for pastoral care and a passion for community outreach.
      </p>
      <p style={{ color: 'var(--grey-text)', fontSize: '14px', lineHeight: 1.9, marginBottom: '24px' }}>
        Every Sunday, Pastor Talagi leads our congregation in worship that honours our Niuean heritage while speaking to the hearts of all who gather — young and old, longtime members and first-time visitors.
      </p>
      <a href="/pastor" style={{ display: 'inline-block', background: 'var(--green)', color: 'white', padding: '10px 22px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
        Meet Pastor Talagi →
      </a>
    </div>
    <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(45,80,22,0.15)', background: 'var(--green)', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '80px' }}>✝</div>
      <div style={{ color: 'var(--gold-light)', fontSize: '18px', fontStyle: 'italic', textAlign: 'center', padding: '0 24px' }}>
        "Ko e lotu fakalelei"
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>A Reformed Faith</div>
    </div>
  </div>

  {/* Story Block 3 — Service Times */}
  <div style={{ background: 'var(--gold-light)', borderRadius: '12px', padding: '40px', border: '1px solid var(--gold)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
    <div>
      <div style={{ color: 'var(--gold-dark)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>✝ Join Us</div>
      <h3 style={{ color: 'var(--green)', fontSize: '24px', marginBottom: '12px' }}>Come Worship With Us</h3>
      <p style={{ color: 'var(--grey-text)', fontSize: '14px', lineHeight: 1.9 }}>
        Whether you are a longtime member of our Niuean community or visiting for the first time, you are welcome at Sandringham Presbyterian Church. Come as you are.
      </p>
    </div>
    <div>
      {[
        ['🕐', 'Sunday Worship', '10:00am — Church Hall'],
        ['📖', 'Youth Group', 'Wednesdays 6:30pm'],
        ['🙏', 'Bible Study', 'Fridays 7:00pm'],
        ['❤', 'Prayer Meeting', 'Thursdays 7:00pm'],
      ].map(([icon, name, time]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '0.5px solid rgba(201,150,42,0.4)' }}>
          <span style={{ fontSize: '18px' }}>{icon}</span>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--dark)', fontSize: '14px' }}>{name}</div>
            <div style={{ color: 'var(--grey-text)', fontSize: '12px' }}>{time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Footer */}
      <footer style={{ background: 'var(--green)', borderTop: '3px solid var(--gold)', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', fontWeight: 'bold' }}>✝</div>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>Sandringham Presbyterian</span>
            </div>
            <p style={{ color: 'var(--gold-light)', fontSize: '12px', lineHeight: 1.7 }}>A Niuean Christian community in the heart of Auckland, New Zealand.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Links</h4>
            {[['/', 'Home'], ['/pastor', 'Pastor Talagi'], ['/events', 'Events'], ['/sermons', 'Sermons'], ['/contact', 'Contact']].map(([path, label]) => (
              <Link key={path} to={path} style={{ display: 'block', color: 'var(--gold-light)', fontSize: '13px', textDecoration: 'none', marginBottom: '6px' }}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h4>
            <p style={{ color: 'var(--gold-light)', fontSize: '13px', lineHeight: 1.8 }}>
              📍 Sandringham, Auckland<br />
              🕐 Sundays at 10:00am<br />
              ✉ john.aholima@hotmail.com
            </p>
          </div>
        </div>
        <div style={{ borderTop: '0.5px solid rgba(201,150,42,0.3)', marginTop: '24px', paddingTop: '16px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>© 2025 Sandringham Presbyterian Church, Auckland, New Zealand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home