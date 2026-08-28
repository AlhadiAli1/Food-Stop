import { BRAND } from './data/menuData'

const mapSrc =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Sultaniyeh, Sour (Tyre), Lebanon') +
  '&output=embed'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy reveal reveal-left">
            <span className="eyebrow">Visit Us</span>
            <h2>
              Come Hungry. <em>Leave Happy.</em>
            </h2>
            <p style={{ color: 'var(--ink-dim)' }}>
              Find us in the heart of Sour, Lebanon. Follow @food_stop_leb for 
              daily specials, new drops and behind-the-grill moments.
            </p>
            <ul className="contact-list">
              <li>
                <div className="ci">📍</div>
                <div>
                  <small>Location</small>
                  <b>Sultaniyeh, Sour (Tyre) — Lebanon</b>
                </div>
              </li>
              <li>
                <div className="ci">📞</div>
                <div>
                  <small>Phone</small>
                  <b>
                    <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a>
                  </b>
                </div>
              </li>
              <li>
                <div className="ci">🕒</div>
                <div>
                  <small>Hours</small>
                  <b>Open 7 days a week</b>
                </div>
              </li>
            </ul>
            <div className="socials">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href={BRAND.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
              <a href={`tel:${BRAND.phoneTel}`} aria-label="Call">☎</a>
            </div>
          </div>
          <div className="contact-map reveal reveal-right">
            <div style={{ textAlign: 'center' }}>
              <div className="pin">📍</div>
              <p>Sultaniyeh, Sour</p>
            </div>
            <iframe
              title="Food Stop location"
              src={mapSrc}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'grayscale(0.4)' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
