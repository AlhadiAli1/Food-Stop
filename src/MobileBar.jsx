import { BRAND } from './data/menuData'

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M3 7h18M3 12h18M3 17h12" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
  </svg>
)

export default function MobileBar() {
  return (
    <div className="mobile-bar" role="complementary" aria-label="Quick actions">
      <a href="#menu" className="mb-btn mb-primary">
        <MenuIcon />
        <span>View Menu</span>
      </a>
      <a href={`tel:${BRAND.phoneTel}`} className="mb-btn mb-call">
        <PhoneIcon />
        <span>Call</span>
      </a>
    </div>
  )
}