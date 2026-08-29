import { useReveal } from './useReveal'
import VideoIntro from './VideoIntro.jsx'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import Marquee from './Marquee.jsx'
import Featured from './Featured.jsx'
import Menu from './Menu.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'
import MobileBar from './MobileBar.jsx'
import CartDialog from './CartDialog.jsx'

export default function App() {
  useReveal()

  return (
    <div className="grain">
      <VideoIntro />
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main" tabIndex="-1">
        <Hero />
        <Marquee />
        <Featured />
        <Menu />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
      <CartDialog />
    </div>
  )
}