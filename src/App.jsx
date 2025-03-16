import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LearningPage from './components/LearningPage' // Import LearningPage

function App() {
  const [showLearningPage, setShowLearningPage] = useState(false)

  return (
    <>
      {/* Only show Navbar when not in learning page */}
      {!showLearningPage && <Navbar />}

      {showLearningPage ? (
        <LearningPage setShowLearningPage={setShowLearningPage} />
      ) : (
        <>
          <Hero setShowLearningPage={setShowLearningPage} />
          <About />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App