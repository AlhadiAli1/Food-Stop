import { useEffect } from 'react'

const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))

export function useReveal() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = Array.from(document.querySelectorAll('.reveal-card'))
    const raf = { id: 0 }

    // Reduced motion: show everything instantly, keep the classic block reveal.
    if (reduce) {
      cards.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      const revealEls = Array.from(document.querySelectorAll('.reveal'))
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )
      revealEls.forEach((el) => io.observe(el))
      return () => io.disconnect()
    }

    // Group cards: horizontal (inside a scrollable carousel) vs vertical (viewport).
    const hGroups = []
    const vEls = []
    Array.from(document.querySelectorAll('.carousel')).forEach((carousel) => {
      const children = cards.filter((c) => carousel.contains(c))
      const isScrollable =
        getComputedStyle(carousel).overflowX === 'auto' ||
        getComputedStyle(carousel).overflowX === 'scroll'
      if (isScrollable && children.length) {
        hGroups.push({ carousel, children })
      } else {
        children.forEach((el) => vEls.push(el))
      }
    })

    const eased = (p) => 1 - Math.pow(1 - p, 2)

    const paint = () => {
      hGroups.forEach(({ carousel, children }) => {
        const cr = carousel.getBoundingClientRect()
        const span = carousel.clientWidth
        if (span <= 0) return
        children.forEach((el) => {
          const er = el.getBoundingClientRect()
          const top = er.left - cr.left
          const bottom = er.right - cr.left
          const visible = Math.min(bottom, span) - Math.max(top, 0)
          const p = clamp(visible / Math.min(er.width, span))
          const k = eased(p)
          el.style.opacity = String(k.toFixed(3))
          el.style.transform = `translateX(${(0.5 - k / 2) * 16}px)`
        })
      })
      vEls.forEach((el) => {
        const er = el.getBoundingClientRect()
        const span = window.innerHeight
        const p = clamp((span - er.top) / (span + er.height))
        const k = eased(p)
        el.style.opacity = String(k.toFixed(3))
        el.style.transform = `translateY(${(1 - k) * 20}px)`
      })
    }

    const schedule = () => {
      cancelAnimationFrame(raf.id)
      raf.id = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    hGroups.forEach(({ carousel }) =>
      carousel.addEventListener('scroll', schedule, { passive: true })
    )

    return () => {
      cancelAnimationFrame(raf.id)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}
