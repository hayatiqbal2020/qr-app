import apiClient from './client.js'

/**
 * Sign up – create user and save to backend (users collection).
 * @param {{ name: string, mobile: string, email?: string, password: string }} payload
 * @returns {Promise<{ message: string, userId: string }>}
 * @throws Axios error with err.response.data.error on 4xx/5xx
 */
export async function signup(payload) {
  const body = {
    name: (payload.name || '').trim(),
    mobile: (payload.mobile || '').replace(/\D/g, '').slice(0, 10),
    password: payload.password,
  }
  if (payload.email?.trim()) body.email = payload.email.trim()
  const { data } = await apiClient.post('/api/auth/signup', body)
  return data
}

/**
 * Sign in – authenticate with mobile or email + password.
 * @param {{ login: string, password: string }} payload – login is either 10-digit mobile or email
 * @returns {Promise<{ message: string, userId: string, name: string, mobile: string, email?: string }>}
 * @throws Axios error with err.response.data.error on 4xx/5xx
 */
export async function signin(payload) {
  const login = (payload.login || '').trim()
  const body = { password: payload.password }
  if (login.includes('@')) {
    body.email = login
  } else {
    body.mobile = login.replace(/\D/g, '').slice(0, 10)
  }
  const { data } = await apiClient.post('/api/auth/signin', body)
  return data
}
