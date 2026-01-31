import AppHeader from '../components/AppHeader'
import '../App.css'

function Home() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <AppHeader variant="home" scrollTo={scrollTo} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              One QR Code.
              <br />
              <span className="hero-title-accent">Accept All Payments.</span>
            </h1>
            <p className="hero-subtitle">
              Get your business QR code in minutes. Accept UPI, cards &amp; more from customers—no device, no monthly fee.
            </p>
            <div className="hero-cta">
              <button onClick={() => scrollTo('pricing')} className="btn btn-hero">
                Get Your QR Code
              </button>
              <span className="hero-badge">Setup in 2 minutes</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="qr-mockup">
              <div className="qr-placeholder">
                <svg viewBox="0 0 100 100" className="qr-svg">
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="10" y="10" width="25" height="25" fill="#1a1a2e" />
                  <rect x="65" y="10" width="25" height="25" fill="#1a1a2e" />
                  <rect x="10" y="65" width="25" height="25" fill="#1a1a2e" />
                  <rect x="40" y="40" width="20" height="20" fill="#1a1a2e" />
                  <rect x="65" y="65" width="15" height="15" fill="#1a1a2e" />
                </svg>
              </div>
              <p className="qr-label">Your business QR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section features">
        <div className="container">
          <h2 className="section-title">Simple, fast &amp; secure</h2>
          <p className="section-subtitle">Everything you need to start accepting payments</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant setup</h3>
              <p>Get your unique QR code in 2 minutes. No paperwork, no waiting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure payments</h3>
              <p>Bank-grade security. Every transaction is encrypted and protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>All payment methods</h3>
              <p>Accept UPI, cards, wallets—all through one QR code.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Print or digital</h3>
              <p>Use on counter, poster, or screen. Works everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section how-it-works">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="steps">
            <div className="step">
              <span className="step-num">1</span>
              <h3>Choose your plan</h3>
              <p>Pick the QR code package that fits your business.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <span className="step-num">2</span>
              <h3>Get your QR code</h3>
              <p>We generate your unique QR code and send it instantly.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <span className="step-num">3</span>
              <h3>Start accepting payments</h3>
              <p>Display your QR and receive payments in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section pricing">
        <div className="container">
          <h2 className="section-title">Get your QR code</h2>
          <p className="section-subtitle">One-time purchase. No hidden fees.</p>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Business QR Code</h3>
              <div className="price">
                <span className="price-currency">₹</span>
                <span className="price-amount">499</span>
                <span className="price-note">one-time</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>Unique QR code for your business</li>
              <li>Accept UPI, cards &amp; wallets</li>
              <li>Instant download (PNG, SVG)</li>
              <li>Printable high-resolution file</li>
              <li>Lifetime validity</li>
            </ul>
            <button className="btn btn-primary btn-block">Buy QR Code — ₹499</button>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section trust">
        <div className="container">
          <h2 className="section-title">Payments you can trust</h2>
          <p className="trust-text">
            Your QR code is secure, reliable, and accepted by millions. Start accepting payments in just a few clicks.
          </p>
          <div className="trust-badges">
            <span className="trust-badge">Secure</span>
            <span className="trust-badge">Instant delivery</span>
            <span className="trust-badge">No subscription</span>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="section cta">
        <div className="container">
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-subtitle">Get your QR code now and start accepting payments today.</p>
          <button onClick={() => scrollTo('pricing')} className="btn btn-hero">Get Your QR Code</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">QR</span>
            <span className="logo-text">PayQR</span>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} PayQR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
