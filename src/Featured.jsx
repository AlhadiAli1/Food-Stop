import { FEATURED } from './data/menuData'

const fmt = (p) => `$${p.toFixed(2)}`
const num = (i) => String(i + 1).padStart(2, '0')

export default function Featured() {
  return (
    <section className="section featured" id="featured">
      <div className="container">
        <div className="sec-head reveal">
          <span className="eyebrow">The Signatures</span>
          <h2>Order like a <em>regular</em></h2>
        </div>
      </div>
      <div className="carousel reveal" aria-label="Signature dishes">
        {FEATURED.map((f, i) => (
          <a href="#menu" className="feature-card" key={f.name}>
            <div className="cd">
              <img src={f.pic} alt={f.name} width="600" height="750" loading="lazy" />
            </div>
            <span className="num">{num(i)}</span>
            <div className="f-body">
              <div className="f-meta">
                <span>{f.group}</span>
                <span className="f-price">{fmt(f.price)}</span>
              </div>
              <h3>{f.name}</h3>
            </div>
          </a>
        ))}
        <a href="#menu" className="feature-cta" aria-label="Browse the full menu">
          <span>Browse the<br />full menu →</span>
        </a>
      </div>
    </section>
  )
}