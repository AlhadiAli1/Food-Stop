import { useEffect, useState } from 'react'
import { BRAND } from './data/menuData'
import { useCart } from './CartContext'

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 7h12l1.2 13a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { count, setOpen: openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary">
      <div className="container nav-inner">
        <a href="#home" className="wordmark">
          <img src={BRAND.logo} alt="" width="32" height="32" />
          Food<span className="period">.</span>Stop
        </a>
        <ul className="nav-links">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#featured">Signature</a></li>
          <li><a href="#contact">Visit</a></li>
        </ul>
        <a href="#menu" className="btn btn-ghost btn-sm nav-cta">View Menu</a>
        <div className="nav-actions">
          <button
            className="nav-cart"
            aria-label={`Open cart${count ? `, ${count} item${count === 1 ? '' : 's'}` : ''}`}
            onClick={() => openCart(true)}
          >
            <CartIcon />
            {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </div>
    </nav>
  )
}