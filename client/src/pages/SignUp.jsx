import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import ThemeToggle from '../components/ThemeToggle'
import { signup as signupApi } from '../api/authApi.js'
import '../App.css'

const initialValues = {
  name: '',
  mobile: '',
  email: '',
  password: '',
}

const mobileDigits = (v) => (v || '').replace(/\D/g, '')

function validate(values) {
  const errors = {}
  if (!values.name?.trim()) {
    errors.name = 'Full name is required'
  }
  const digits = mobileDigits(values.mobile)
  if (!digits) {
    errors.mobile = 'Mobile number is required'
  } else if (digits.length !== 10) {
    errors.mobile = 'Enter a valid 10-digit mobile number'
  }
  if (values.email?.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Enter a valid email address'
    }
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }
  return errors
}

function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null)
    try {
      await signupApi({
        name: values.name.trim(),
        mobile: values.mobile,
        email: values.email?.trim() || undefined,
        password: values.password,
      })
      navigate('/login', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.error || 'Network error. Please check your connection and try again.'
      setStatus(msg)
    } finally {
      setSubmitting(false)
    }
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

          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, status, isSubmitting, values }) => (
              <Form className="login-form">
                <div className="field-group">
                  <div className={`float-field ${values.name ? 'has-value' : ''}`}>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="float-input"
                      placeholder=" "
                      autoComplete="name"
                    />
                    <label className="float-label" htmlFor="name">Full name</label>
                  </div>
                  {touched.name && errors.name && (
                    <p className="login-error" role="alert">{errors.name}</p>
                  )}
                </div>

                <div className="field-group">
                  <div className={`float-field ${values.mobile ? 'has-value' : ''}`}>
                    <Field
                      id="mobile"
                      name="mobile"
                      type="tel"
                      className="float-input"
                      placeholder=" "
                      autoComplete="tel"
                      maxLength={10}
                      inputMode="numeric"
                    />
                    <label className="float-label" htmlFor="mobile">Mobile No</label>
                  </div>
                  {touched.mobile && errors.mobile && (
                    <p className="login-error" role="alert">{errors.mobile}</p>
                  )}
                </div>

                <div className="field-group">
                  <div className={`float-field ${values.email ? 'has-value' : ''}`}>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="float-input"
                      placeholder=" "
                      autoComplete="email"
                    />
                    <label className="float-label" htmlFor="email">Email Address</label>
                  </div>
                  {touched.email && errors.email && (
                    <p className="login-error" role="alert">{errors.email}</p>
                  )}
                </div>

                <div className="field-group">
                  <div className={`float-field ${values.password ? 'has-value' : ''}`}>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="float-input"
                      placeholder=" "
                      autoComplete="new-password"
                    />
                    <label className="float-label" htmlFor="password">Password</label>
                  </div>
                  {touched.password && errors.password && (
                    <p className="login-error" role="alert">{errors.password}</p>
                  )}
                </div>

                {status && <p className="login-error" role="alert">{status}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block login-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </Form>
            )}
          </Formik>

          <p className="login-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default SignUp
