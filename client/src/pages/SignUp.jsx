import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import '../App.css'

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    // Placeholder: add your sign-up logic here (e.g. API call)
    console.log('Sign up:', { name, email, password })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">QR</span>
            <span className="logo-text">PayQR</span>
          </Link>
          <div className="header-actions">
            <ThemeToggle />
            <Link to="/" className="nav-link link-back">
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <section className="login-section">
        <div className="login-bg"></div>
        <div className="login-card">
          <h1 className="login-title">Create your account</h1>
          <p className="login-subtitle">Sign up to get your PayQR business QR code</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label">Full name</label>
            <input
              type="text"
              className="login-input"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="login-label">Email or phone</label>
            <input
              type="text"
              className="login-input"
              placeholder="Enter email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <label className="login-label">Confirm password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block login-submit">
              Create account
            </button>
          </form>

          <p className="login-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default SignUp
