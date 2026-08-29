import { useCart } from './CartContext'

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M3 7h18M3 12h18M3 17h12" />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 7h12l1.2 13a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
)

export default function MobileBar() {
  const { count, setOpen } = useCart()

  return (
    <div className="mobile-bar" role="complementary" aria-label="Quick actions">
      <a href="#menu" className="mb-btn mb-primary">
        <MenuIcon />
        <span>View Menu</span>
      </a>
      <button className="mb-btn mb-cart" onClick={() => setOpen(true)} aria-label={`Open cart${count ? `, ${count} item${count === 1 ? '' : 's'}` : ''}`}>
        <CartIcon />
        <span>Cart</span>
        {count > 0 && <span className="badge">{count}</span>}
      </button>
    </div>
  )
}