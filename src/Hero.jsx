import { HERO_IMAGE } from './data/menuData'

export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="hero-bg">
        <img className="bg-img" src={HERO_IMAGE} alt="" />
      </div>
      <div className="container">
        <div className="hero-content">
          <span className="eyebrow">Good Food, Good Mood</span>
          <h1>
            Food
            <br />
            <span className="accent">Stop</span>
          </h1>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-gold">View The Menu</a>
          </div>
        </div>
      </div>
    </header>
  )
}
