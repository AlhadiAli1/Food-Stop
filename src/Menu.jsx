import { useState, useRef, useEffect } from 'react'
import { MENU_SECTIONS, MENU_ITEMS } from './data/menuData'

const fmt = (price, ll) => (ll ? `${Math.round(price).toLocaleString()} LL` : `$${price.toFixed(2)}`)

function MenuItem({ item, i }) {
  return (
    <article className={`menu-row ${item.pic ? 'has-img' : ''}`} style={{ '--i': i }}>
      {item.pic && (
        <div className="thumb">
          <img src={item.pic} alt="" width="128" height="128" loading="lazy" />
        </div>
      )}
      <div className="r-body">
        <div className="r-top">
          <h3>
            {item.name}
            {item.signature && <span className="sig">* Sig.</span>}
          </h3>
          <span className="leader" aria-hidden="true" />
          <span className={`price ${item.ll ? 'll' : ''}`}>{fmt(item.price, item.ll)}</span>
        </div>
        {item.sub && <p className="sub">{item.sub}</p>}
      </div>
    </article>
  )
}

function MenuTabs({ sections, active, onChange, barRef }) {
  const onKey = (e, idx) => {
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % sections.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + sections.length) % sections.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = sections.length - 1
    if (next === null) return
    e.preventDefault()
    onChange(sections[next].label)
    const el = document.querySelector(`.menu-tabs [role="tab"][data-index="${next}"]`)
    el?.focus()
    el?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }

  return (
    <div className="menu-tabs" role="tablist" aria-label="Menu categories" ref={barRef}>
      {sections.map((s, idx) => (
        <button
          key={s.label}
          role="tab"
          id={`mtab-${idx}`}
          data-index={idx}
          aria-selected={s.label === active}
          aria-controls="menu-panel"
          className={`menu-tab ${s.label === active ? 'active' : ''}`}
          tabIndex={s.label === active ? 0 : -1}
          onClick={() => onChange(s.label)}
          onKeyDown={(e) => onKey(e, idx)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState(MENU_SECTIONS[0].label)
  const activeIndex = MENU_SECTIONS.findIndex((s) => s.label === active)
  const section = MENU_SECTIONS[activeIndex]
  const items = MENU_ITEMS.filter((i) => i.group === active)
  const barRef = useRef(null)
  const touch = useRef(null)

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) < 48 || Math.abs(dy) > Math.abs(dx) * 1.25) return
    const nextIdx =
      (activeIndex + (dx < 0 ? 1 : -1) + MENU_SECTIONS.length) % MENU_SECTIONS.length
    setActive(MENU_SECTIONS[nextIdx].label)
  }

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const btn = el.querySelector('.menu-tab.active')
    if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <section className="section menu" id="menu">
      <div className="container">
        <div className="sec-head reveal">
          <span className="eyebrow">Our Menu</span>
          <h2>Off the <em>placard</em></h2>
        </div>
      </div>

      <div className="menu-rail">
        <MenuTabs sections={MENU_SECTIONS} active={active} onChange={setActive} barRef={barRef} />
      </div>

      <div className="container">
        <div
          className="menu-panel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="menu-head">
            <h3>{section.label}</h3>
            <span className="count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          </div>
          <p className="menu-tagline">{section.tagline}</p>
          <div
            className="menu-grid"
            role="tabpanel"
            id="menu-panel"
            aria-labelledby={`mtab-${activeIndex}`}
            key={active}
            tabIndex={0}
          >
            {items.map((item, i) => (
              <MenuItem item={item} i={i} key={item.name} />
            ))}
          </div>
        </div>

        {active === 'Beverages' && (
          <p className="menu-note">
            <b>Note:</b> Water, laban, soft drinks and bottle drinks are priced in
            Lebanese Lira (LL).
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