import { BRAND } from './data/menuData'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#home" className="wordmark">
          <img src={BRAND.logo} alt={BRAND.name} />
          Food<span className="dot">.</span>Stop
        </a>
        <p>© {new Date().getFullYear()} Food Stop — Sour, Lebanon. All rights reserved.</p>
        <ul className="flinks">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </footer>
  )
}
