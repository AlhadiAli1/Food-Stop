import { BRAND } from './data/menuData'

const mapSrc =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Sultaniyeh, Sour (Tyre), Lebanon') +
  '&output=embed'

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
  </svg>
)

const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export default function Contact() {
  return (
    <section className="section visit" id="contact">
      <div className="container">
        <div className="visit-grid">
          <div className="visit-copy reveal reveal-left">
            <span className="eyebrow">Visit Us</span>
            <h2>
              Come hungry. <em>Leave full.</em>
            </h2>
            <p className="lead">
              Follow{' '}
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                @food_stop_leb
              </a>{' '}
              for daily specials and moments behind the grill.
            </p>
            <ul className="contact-list">
              <li>
                <div className="ci"><Pin /></div>
                <div>
                  <small>Location</small>
                  <b>{BRAND.location}</b>
                </div>
              </li>
              <li>
                <div className="ci"><Phone /></div>
                <div>
                  <small>Phone</small>
                  <b><a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a></b>
                </div>
              </li>
              <li>
                <div className="ci"><Clock /></div>
                <div>
                  <small>Hours</small>
                  <b>7 days a week — until late</b>
                </div>
              </li>
            </ul>
            <div className="socials">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href={BRAND.facebook} target="_blank" rel="noreferrer">Facebook ↗</a>
            </div>
          </div>

          <div className="visit-map reveal reveal-right">
            <iframe
              title="Food Stop location"
              src={mapSrc}
              loading="lazy"
            />
            <span className="map-cap">Sour — 33.27° N / 35.19° E</span>
          </div>
        </div>
      </div>
    </section>
  )
}