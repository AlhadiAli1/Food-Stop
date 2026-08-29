import { BRAND } from './data/menuData'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#home" className="wordmark">
          <img src={BRAND.logo} alt="" width="32" height="32" />
          Food<span className="period">.</span>Stop
        </a>
        <ul className="flinks">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#featured">Signature</a></li>
          <li><a href="#contact">Visit</a></li>
        </ul>
        <p className="mono">Sour — 33.27° N / 35.19° E</p>
        <p className="copyright">© {new Date().getFullYear()} Food Stop — Sour, Lebanon. All rights reserved.</p>
      </div>
    </footer>
  )
}