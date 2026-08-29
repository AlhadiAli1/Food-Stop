import { useCallback, useEffect, useRef, useState } from 'react'

const INTRO_SRC = '/video/intro.mp4'
const RETRIGGER_PX = 60

export default function VideoIntro() {
  const video = useRef(null)
  const [show, setShow] = useState(false)
  const lock = useRef(false)
  const armed = useRef(true)
  const done = useRef(false)
  const reduce = useRef(false)
  const restoreFocus = useRef(null)

  const finish = useCallback(() => {
    lock.current = false
    armed.current = false
    done.current = true
    document.body.classList.add('intro-done')
    const v = video.current
    if (v) v.pause()
    const active = document.activeElement
    setShow(false)
    if (restoreFocus.current && restoreFocus.current !== active) {
      restoreFocus.current.focus?.()
    }
    restoreFocus.current = null
  }, [])

  const start = useCallback(() => {
    if (reduce.current || lock.current) return
    lock.current = true
    restoreFocus.current = document.activeElement
    setShow(true)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduce.current = media.matches

    const raf = requestAnimationFrame(() => {
      if (reduce.current) {
        document.body.classList.add('intro-done')
        return
      }
      start()
    })

    const onScroll = () => {
      if (reduce.current) return
      if (window.scrollY > RETRIGGER_PX) {
        armed.current = true
        return
      }
      if (armed.current && done.current) {
        armed.current = false
        start(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [start])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', show)
    document.documentElement.classList.toggle('no-scroll', show)
    return () => {
      document.body.classList.remove('no-scroll')
      document.documentElement.classList.remove('no-scroll')
    }
  }, [show])

  useEffect(() => {
    if (!show) return
    const v = video.current
    if (!v) return
    v.currentTime = 0
    v.play()?.catch(() => {})
  }, [show])

  useEffect(() => {
    if (!show) return
    const onDoc = (e) => {
      if (e.target.closest('.nav, .menu-dialog, .intro-frame')) {
        finish()
      }
    }
    document.addEventListener('click', onDoc, true)
    return () => document.removeEventListener('click', onDoc, true)
  }, [show, finish])

  useEffect(() => {
    if (!show) return
    let touchY = null
    const onWheel = (e) => {
      if (e.deltaY > 0) finish()
    }
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? null
    }
    const onTouchEnd = (e) => {
      if (touchY == null) return
      const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY)
      touchY = null
      if (dy > 30) finish()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [show, finish])

  return (
    <div className={`intro${show ? ' intro-show' : ''}`} aria-hidden={!show}>
      <div className="intro-frame">
        <video
          ref={video}
          className="intro-video"
          src={INTRO_SRC}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          onEnded={finish}
        />
        <div className="intro-corner" aria-hidden="true">
          <span className="intro-topline">Sultaniyeh · Lebanon</span>
          <span className="intro-topline">N 33° 16' — E 35° 11'</span>
        </div>
        <div className="intro-bottom" aria-hidden="true">
          <span className="intro-cap">Brand film 01</span>
          <span className="intro-cap">Est. for the night</span>
        </div>
      </div>
    </div>
  )
}