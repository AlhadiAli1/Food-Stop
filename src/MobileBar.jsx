import { BRAND } from './data/menuData'

export default function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href="#menu" className="mb-btn">
        <span className="mb-icon">🍔</span>
        <span>View Menu</span>
      </a>
      <a href={`tel:${BRAND.phoneTel}`} className="mb-btn mb-call">
        <span className="mb-icon">📞</span>
        <span>Call Now</span>
      </a>
    </div>
  )
}
