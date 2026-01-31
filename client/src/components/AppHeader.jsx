import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import '../App.css'

/**
 * Shared app header. Use variant="home" on the landing page (nav + Sign up/Login)
 * and variant="auth" on Login/SignUp (ThemeToggle + Back to home).
 */
function AppHeader({ variant = 'auth', scrollTo }) {
  const isHome = variant === 'home'

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">QR</span>
          <span className="logo-text">PayQR</span>
        </Link>

        {isHome && (
          <nav className="nav">
            <button onClick={() => scrollTo?.('features')} className="nav-link">Features</button>
            <button onClick={() => scrollTo?.('how-it-works')} className="nav-link">How it works</button>
            <button onClick={() => scrollTo?.('pricing')} className="nav-link">Pricing</button>
            <button onClick={() => scrollTo?.('contact')} className="nav-link">Contact</button>
          </nav>
        )}

        <div className="header-actions">
          <ThemeToggle />
          {isHome ? (
            <>
              <Link to="/signup" className="nav-link header-link">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-primary header-cta">
                Login
              </Link>
            </>
          ) : (
            <Link to="/" className="nav-link link-back">
              ← Back to home
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default AppHeader
