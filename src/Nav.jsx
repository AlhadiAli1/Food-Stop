import { useEffect, useState } from 'react'
import { BRAND } from './data/menuData'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['Home', '#home'],
    ['Menu', '#menu'],
    ['Visit Us', '#contact'],
  ]
  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="wordmark">
            <img src={BRAND.logo} alt={BRAND.name} />
            Food<span className="dot">.</span>Stop
          </a>
          <ul className="nav-links">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li>
              <a href="#menu" className="nav-cta">View Menu</a>
            </li>
          </ul>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span style={{ transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
