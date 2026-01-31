import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import AppHeader from '../components/AppHeader'
import { signin as signinApi } from '../api/authApi.js'
import '../App.css'

const initialValues = {
  login: '',
  password: '',
}

function validate(values) {
  const errors = {}
  const login = (values.login || '').trim()
  if (!login) {
    errors.login = 'Mobile number or email is required'
  } else if (login.includes('@')) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)) {
      errors.login = 'Enter a valid email address'
    }
  } else {
    const digits = login.replace(/\D/g, '')
    if (digits.length !== 10) {
      errors.login = 'Enter a valid 10-digit mobile number'
    }
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}

function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null)
    try {
      const data = await signinApi({
        login: values.login.trim(),
        password: values.password,
      })
      if (data?.userId) {
        localStorage.setItem('payqr_user', JSON.stringify({
          userId: data.userId,
          name: data.name,
          mobile: data.mobile,
          email: data.email,
        }))
      }
      navigate('/', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.error || 'Network error. Please try again.'
      setStatus(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app">
      <AppHeader />

      <section className="login-section">
        <div className="login-bg"></div>
        <div className="login-card">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your PayQR account</p>

          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, status, isSubmitting, values }) => (
              <Form className="login-form">
                <div className="field-group">
                  <div className={`float-field ${values.login ? 'has-value' : ''}`}>
                    <Field
                      id="login"
                      name="login"
                      type="text"
                      className="float-input"
                      placeholder=" "
                      autoComplete="username"
                      inputMode="text"
                    />
                    <label className="float-label" htmlFor="login">
                      Mobile No or Email Id
                    </label>
                  </div>
                  {touched.login && errors.login && (
                    <p className="login-error" role="alert">{errors.login}</p>
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
                      autoComplete="current-password"
                    />
                    <label className="float-label" htmlFor="password">
                      Password
                    </label>
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
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </Form>
            )}
          </Formik>

          <p className="login-footer">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login
