import { useReveal } from './useReveal'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import Marquee from './Marquee.jsx'
import Featured from './Featured.jsx'
import Menu from './Menu.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'
import MobileBar from './MobileBar.jsx'

export default function App() {
  useReveal()

  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Featured />
        <Menu />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
