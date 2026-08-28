import { FEATURED } from './data/menuData'

const formatPrice = (p) => `$${p.toFixed(2)}`

export default function Featured() {
  return (
    <section className="section featured">
      <div className="container">
        <div className="sec-head reveal">
          <span className="eyebrow">The Favourites</span>
          <h2>Signature <em>Picks</em></h2>
        </div>
        <div className="carousel" aria-label="Featured items">
          {FEATURED.map((f, i) => (
            <a
              href="#menu"
              className="carousel-card reveal reveal-zoom"
              key={f.name}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="price">{formatPrice(f.price)}</span>
              <img src={f.pic} alt={f.name} loading="lazy" />
              <div className="overlay">
                <div className="tag">Featured</div>
                <h3>{f.name}</h3>
                <div className="group">{f.group}</div>
              </div>
            </a>
          ))}
        </div>
        <p className="carousel-hint">‹ swipe to explore ›</p>
      </div>
    </section>
  )
}
