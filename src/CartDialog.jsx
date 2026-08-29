import { useEffect, useRef, useState } from 'react'
import {
  useCart,
  fmtPrice,
  totalsOf,
  itemEmoji,
  orderVerify,
  buildOrderMessage,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from './CartContext'

export default function CartDialog() {
  const {
    cart,
    open,
    setOpen,
    count,
    inc,
    dec,
    remove,
    clear,
    orderType,
    setOrderType,
  } = useCart()
  const closeBtn = useRef(null)
  const sheetRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)

  const requestClose = () => setShown(false)

  useEffect(() => {
    if (!open) return undefined
    setMounted(true)
  }, [open])

  useEffect(() => {
    if (!mounted || shown) return undefined
    sheetRef.current?.getBoundingClientRect()
    setShown(true)
  }, [mounted])

  useEffect(() => {
    if (shown || !mounted) return undefined
    const t = setTimeout(() => {
      setOpen(false)
      setMounted(false)
    }, 380)
    return () => clearTimeout(t)
  }, [shown, mounted, setOpen])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) closeBtn.current?.focus()
  }, [open])

  if (!mounted) return null

  const { usd, ll } = totalsOf(cart)
  const { orderId } = orderVerify(cart)
  const message = buildOrderMessage(cart, orderType)
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <div className="cart-root" role="dialog" aria-modal="true" aria-label="Your order">
      <div
        className={`cart-backdrop${shown ? ' open' : ''}`}
        onClick={requestClose}
      />
      <div className={`cart-sheet${shown ? ' open' : ''}`} ref={sheetRef}>
        <header className="cart-head">
          <div>
            <span className="eyebrow">Your order</span>
            <h2 className="cart-title">
              Cart{count > 0 && <span className="cart-head-count">{count}</span>}
            </h2>
          </div>
          <button
            ref={closeBtn}
            className="cart-close"
            aria-label="Close cart"
            onClick={requestClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Nothing in the cart yet — go grab something good.</p>
            <a href="#menu" className="btn btn-ghost" onClick={requestClose}>
              Browse the menu
            </a>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {cart.map((l) => (
                <li className="cart-line" key={l.key}>
                  <div className="cl-info">
                    <b>
                      {itemEmoji(l.item)} {l.item.name}
                    </b>
                    <span className="cl-unit">
                      {l.qty} × {fmtPrice(l.item)}
                    </span>
                  </div>
                  <div className="cl-qty">
                    <button type="button" onClick={() => dec(l.key)} aria-label={`Remove one ${l.item.name}`}>
                      −
                    </button>
                    <span className="cl-n">{l.qty}</span>
                    <button type="button" onClick={() => inc(l.key)} aria-label={`Add one ${l.item.name}`}>
                      +
                    </button>
                  </div>
                  <button
                    className="cl-remove"
                    type="button"
                    onClick={() => remove(l.key)}
                    aria-label={`Remove ${l.item.name} from order`}
                  >
                    Remove
                  </button>
                  <span className="cl-total">
                    {fmtPrice({ price: l.item.price * l.qty, ll: l.item.ll })}
                  </span>
                </li>
              ))}
            </ul>

            <footer className="cart-foot">
              <div className="cart-totals">
                {usd > 0 && (
                  <div className="ct-row ct-total">
                    <span>Total · USD</span>
                    <b>${usd.toFixed(2)}</b>
                  </div>
                )}
                {ll > 0 && (
                  <div className="ct-row ct-total">
                    <span>Total · LL</span>
                    <b>{Math.round(ll).toLocaleString()} LL</b>
                  </div>
                )}
              </div>
              <div className="ot-wrap">
                <span className="ot-label" id="ot-label">Order type</span>
                <div className="ot-toggle" role="radiogroup" aria-labelledby="ot-label">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={orderType === 'dinein'}
                    className={`ot-btn${orderType === 'dinein' ? ' active' : ''}`}
                    onClick={() => setOrderType('dinein')}
                  >
                    <span aria-hidden="true">🍽</span> Dine in
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={orderType === 'delivery'}
                    className={`ot-btn${orderType === 'delivery' ? ' active' : ''}`}
                    onClick={() => setOrderType('delivery')}
                  >
                    <span aria-hidden="true">🛵</span> Delivery
                  </button>
                </div>
              </div>
              <a
                className="btn btn-primary cart-send"
                href={waHref}
                target="_blank"
                rel="noreferrer"
              >
                Send order via WhatsApp
              </a>
              <p className="cart-note">
                Opens WhatsApp {WHATSAPP_DISPLAY} with your order pre-filled — just hit send.
              </p>
              <p className="cart-verify">
                <span aria-hidden="true">🔐</span> Verify: <b className="cart-code">{orderId}</b>
                <span className="cart-verify-hint"> — any edited price breaks the code.</span>
              </p>
              <button type="button" className="cart-clear" onClick={clear}>
                Clear cart
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}