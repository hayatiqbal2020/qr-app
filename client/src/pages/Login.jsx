import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import '../App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: add your login logic here (e.g. API call)
    console.log('Login:', { email, password })
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
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your PayQR account</p>

          <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary btn-block login-submit">
              Sign in
            </button>
          </form>

          <p className="login-footer">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login
