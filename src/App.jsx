import { useState, lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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

// Layout component for pages that need navbar
const MainLayout = ({ children, darkMode, toggleDarkMode, user, setUser, onLogout, onLoginClick }) => {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isVisible={true}
        user={user}
        setUser={setUser}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
      />
      {children}
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [authKey, setAuthKey] = useState(0) // Key to force AuthModal remount on logout
  const location = useLocation()

  // Handle hash scrolling and scroll to top on path change
  useEffect(() => {
    if (isLoading) return;

    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location, isLoading])

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

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('ezstudy_currentUser')
    setUser(null)
    setAuthKey(prev => prev + 1) // Force AuthModal remount to clear fields
  }

  const openAuth = (mode = 'signin') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  // Force URL to root during preloader
  useEffect(() => {
    if (isLoading && window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
  }, [isLoading]);

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Auth Modal */}
      <AuthModal
        key={authKey}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <MainLayout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
            onLoginClick={openAuth}
          >
            <Hero
              isReady={true}
              user={user}
              onLoginClick={() => openAuth('signin')}
              onSignupClick={() => openAuth('signup')}
            />
            <About />
            <Contact />
            <Footer />
          </MainLayout>
        } />

        {/* AI Console */}
        <Route path="/ai-console" element={
          user ? (
            <LearningPage user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Legal Pages */}
        <Route path="/terms-conditions" element={
          <MainLayout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
            onLoginClick={openAuth}
          >
            <Legal type="terms" />
          </MainLayout>
        } />

        <Route path="/privacy-policy" element={
          <MainLayout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
            onLoginClick={openAuth}
          >
            <Legal type="privacy" />
          </MainLayout>
        } />

        <Route path="/services" element={
          <MainLayout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
            onLoginClick={openAuth}
          >
            <Legal type="services" />
          </MainLayout>
        } />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App