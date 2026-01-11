import { useState, lazy, Suspense, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Legal from './components/Legal'
import LearningPage from './components/LearningPage'
import Preloader from './components/Preloader'
import AuthModal from './components/AuthModal'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLearningPage, setShowLearningPage] = useState(false)
  const [activeLegal, setActiveLegal] = useState(null) // 'terms', 'privacy', 'services'
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')

  useEffect(() => {
    // Robust check for existing user in localStorage
    try {
      const savedUser = localStorage.getItem('ezstudy_currentUser')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      localStorage.removeItem('ezstudy_currentUser');
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Show preloader for 5 seconds
    return () => clearTimeout(timer)
  }, [])

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('ezstudy_currentUser')
    setUser(null)
    setShowLearningPage(false)
  }

  const openAuth = (mode = 'signin') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('darkMode', JSON.stringify(newValue))
      return newValue
    })
  }

  useEffect(() => {
    // Scroll to top when switching between landing and learning console
    window.scrollTo(0, 0);
  }, [showLearningPage]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      {isLoading && <Preloader />}

      {/* Legal Pages Overlay */}
      {activeLegal && <Legal type={activeLegal} onClose={() => setActiveLegal(null)} />}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      {/* Only show Navbar when not in learning page */}
      {!showLearningPage && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isVisible={!isLoading}
          user={user}
          setUser={setUser}
          onLogout={handleLogout}
          onLoginClick={() => openAuth('signin')}
          setShowLearningPage={setShowLearningPage}
        />
      )}

      {!isLoading && (
        <div>
          {showLearningPage ? (
            <LearningPage
              setShowLearningPage={setShowLearningPage}
              user={user}
              onLogout={handleLogout}
            />
          ) : (
            <div>
              <Hero
                setShowLearningPage={setShowLearningPage}
                isReady={!isLoading}
                user={user}
                onLoginClick={() => openAuth('signin')}
                onSignupClick={() => openAuth('signup')}
              />
              <About />
              <Contact setActiveLegal={setActiveLegal} />
              <Footer setActiveLegal={setActiveLegal} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App