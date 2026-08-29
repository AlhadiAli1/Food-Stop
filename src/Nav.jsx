import { useEffect, useRef, useState } from 'react'
import { BRAND } from './data/menuData'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)
  const burger = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['01', 'Menu', '#menu'],
    ['02', 'Signature', '#featured'],
    ['03', 'Visit', '#contact'],
  ]

  const openMenu = () => {
    setOpen(true)
    dialog.current?.showModal()
  }
  const closeMenu = () => dialog.current?.close()

  return (
    <>
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
          <button
            ref={burger}
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={open ? closeMenu : openMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <dialog
        ref={dialog}
        className="menu-dialog"
        aria-label="Site menu"
        onClose={() => {
          setOpen(false)
          burger.current?.focus()
        }}
      >
        <nav aria-label="Mobile">
          {links.map(([no, label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>{label}</span>
              <span className="d-number">{no}</span>
            </a>
          ))}
        </nav>
        <div className="d-foot">
          <p className="d-cap">Sultaniyeh, Lebanon — dine in · takeaway · hookah</p>
          <a href={`tel:${BRAND.phoneTel}`}>Call {BRAND.phone}</a>
        </div>
      </dialog>
    </>
  )
}