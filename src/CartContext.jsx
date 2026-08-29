import { createContext, useContext, useMemo, useReducer, useState } from 'react'

export const WHATSAPP_NUMBER = '96171919234'
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER}`

const CartContext = createContext(null)

export const fmtAmount = (value, ll) =>
  ll ? `${Math.round(value).toLocaleString()} LL` : `$${Number(value).toFixed(2)}`

export const fmtPrice = (item) => fmtAmount(item.price, item.ll)

const keyOf = (item) => `${item.group}::${item.name}`

function reducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const k = keyOf(action.item)
      const found = cart.find((l) => l.key === k)
      if (found) return cart.map((l) => (l.key === k ? { ...l, qty: l.qty + 1 } : l))
      return [...cart, { key: k, item: action.item, qty: 1 }]
    }
    case 'inc':
      return cart.map((l) => (l.key === action.key ? { ...l, qty: l.qty + 1 } : l))
    case 'dec':
      return cart
        .map((l) => (l.key === action.key ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    case 'remove':
      return cart.filter((l) => l.key !== action.key)
    case 'clear':
      return []
    default:
      return cart
  }
}

export function totalsOf(cart) {
  let usd = 0
  let ll = 0
  for (const l of cart) {
    if (l.item.ll) ll += l.item.price * l.qty
    else usd += l.item.price * l.qty
  }
  return { usd, ll }
}

const GROUP_EMOJI = {
  Starters: '🍟',
  Sandwiches: '🥪',
  Shawarma: '🥙',
  Burgers: '🍔',
  Platters: '🍖',
  'Family Meal': '🍱',
  'To Add': '🧀',
  Beverages: '🥤',
  'Cocktail & Juice': '🍹',
  Desserts: '🍰',
  Hookah: '🌙',
}
export const itemEmoji = (item) => GROUP_EMOJI[item.group] || '🍽'

// Compact content hash so any manual edit to an item name, quantity or price
// produces a different verify code — staff can re-check the order in the menu.
function hashText(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36).toUpperCase().padStart(6, '0').slice(-6)
}

export function orderVerify(cart) {
  const seed = [...cart]
    .sort((a, b) => a.item.name.localeCompare(b.item.name))
    .map((l) => `${l.item.name}|${l.qty}|${l.item.price}`)
    .join('~')
  const code = hashText(seed)
  return { code, orderId: `FS-${code}` }
}

export function buildOrderMessage(cart, orderType = 'dinein') {
  if (cart.length === 0) return ''
  const { usd, ll } = totalsOf(cart)
  const { orderId } = orderVerify(cart)
  const line = '─'.repeat(28)
  const stamp = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
  const tag = orderType === 'delivery' ? '🛵 *DELIVERY*' : '🍽 *DINE IN*'
  const pay = orderType === 'delivery' ? '🛵 *DELIVERY ORDER*' : '💰 *PAY AT PICKUP*'

  const items = []
  for (const l of cart) {
    items.push(`${itemEmoji(l.item)} ${l.item.name}`)
    items.push(`   ${l.qty} × ${fmtPrice(l.item)} = ${fmtAmount(l.item.price * l.qty, l.item.ll)}`)
  }

  const out = ['🛒 *FOOD STOP — NEW ORDER*', `📋 ${orderId} · ${stamp}`, tag, line, ...items, line, pay]
  if (usd > 0) out.push(`   *USD  $${usd.toFixed(2)}*`)
  if (ll > 0) out.push(`   *LL   ${Math.round(ll).toLocaleString()} LL*`)
  out.push(line, `🔐 Verify: ${orderId}`, 'Sent via the Food Stop menu · Sultaniyeh')
  return out.join('\n')
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [])
  const [open, setOpen] = useState(false)
  const [orderType, setOrderType] = useState('dinein')

  const value = useMemo(() => {
    const count = cart.reduce((n, l) => n + l.qty, 0)
    return {
      cart,
      count,
      addItem: (item) => dispatch({ type: 'add', item }),
      inc: (key) => dispatch({ type: 'inc', key }),
      dec: (key) => dispatch({ type: 'dec', key }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
      open,
      setOpen,
      orderType,
      setOrderType,
    }
  }, [cart, open, orderType])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}