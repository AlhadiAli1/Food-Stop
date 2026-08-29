import { BRAND, HERO_IMAGE } from './data/menuData'

export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="hero-bg">
        <img className="bg-img" src={HERO_IMAGE} alt="" fetchpriority="high" />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <span className="eyebrow">Sultaniyeh, Lebanon — after dark</span>
          <h1 className="hero-title">
            Food <em>Stop<span className="period">.</span></em>
          </h1>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-primary">View The Menu</a>
            <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
              Call {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}