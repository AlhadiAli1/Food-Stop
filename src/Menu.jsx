import { useState, useRef, useEffect } from 'react'
import { MENU_SECTIONS, MENU_ITEMS } from './data/menuData'

const fmt = (price, ll) => (ll ? `${Math.round(price).toLocaleString()} LL` : `$${price.toFixed(2)}`)

function MenuItem({ item }) {
  return (
    <div className="menu-item">
      <div className="thumb">
        {item.pic ? (
          <img src={item.pic} alt={item.name} loading="lazy" />
        ) : (
          <span className="noimg">✦</span>
        )}
      </div>
      <div className="info">
        <div className="top">
          <h4>
            {item.name}
            {item.signature && <span className="sig">Signature</span>}
          </h4>
          <span className="dots" />
          <span className={`price ${item.ll ? 'll' : ''}`}>{fmt(item.price, item.ll)}</span>
        </div>
        <div className="sub">{item.sub}</div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState(MENU_SECTIONS[0].label)
  const section = MENU_SECTIONS.find((s) => s.label === active)
  const items = MENU_ITEMS.filter((i) => i.group === active)
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const btn = el.querySelector('.menu-tab.active')
    if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <section className="section menu" id="menu">
      <div className="sec-head reveal">
        <span className="eyebrow">Our Menu</span>
        <h2>Order From The <em>Menu</em></h2>
      </div>

      <div className="menu-tabs sticky-tabs reveal" ref={barRef}>
        {MENU_SECTIONS.map((s) => (
          <button
            key={s.label}
            className={`menu-tab ${s.label === active ? 'active' : ''}`}
            onClick={() => setActive(s.label)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="container">
        <div className="menu-panel">
          <div className="menu-head">
            <h2>{section.label}</h2>
            <button className="menu-back" onClick={() => setActive(MENU_SECTIONS[0].label)}>
              ← All
            </button>
          </div>
          <div className="menu-grid" key={active}>
            {items.map((item, i) => (
              <MenuItem item={item} index={i} key={item.name} />
            ))}
          </div>
        </div>

        {active === 'Beverages' && (
          <p className="menu-note">
            <b>Note:</b> Water, laban, soft drinks and bottle drinks are priced in Lebanese Lira (LL).
          </p>
        )}
        {active === 'Hookah' && (
          <p className="menu-note">
            <b>Note:</b> Enjoy our selection of argileh flavours with your order.
          </p>
        )}
      </div>
    </section>
  )
}
