import { FEATURED } from './data/menuData'
import { useCart } from './CartContext'

const fmt = (p) => `$${p.toFixed(2)}`
const num = (i) => String(i + 1).padStart(2, '0')

export default function Featured() {
  const { addItem } = useCart()
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
          <article className="feature-card" key={f.name}>
            <a href="#menu" className="fc-link" aria-label={`${f.name} — see the full menu`}>
              <div className="cd">
                <img src={f.pic} alt="" width="600" height="750" loading="lazy" />
              </div>
              <span className="num">{num(i)}</span>
            </a>
            <div className="f-body">
              <div className="f-text">
                <div className="f-meta">
                  <span>{f.group}</span>
                  <span className="f-price">{fmt(f.price)}</span>
                </div>
                <h3>{f.name}</h3>
              </div>
              <button
                type="button"
                className="fc-add"
                onClick={() => addItem(f)}
                aria-label={`Add ${f.name} to order`}
                title={`Add ${f.name}`}
              >
                +
              </button>
            </div>
          </article>
        ))}
        <a href="#menu" className="feature-cta" aria-label="Browse the full menu">
          <span>Browse the<br />full menu →</span>
        </a>
      </div>
    </section>
  )
}