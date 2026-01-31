import axios from 'axios'

const raw = import.meta.env.VITE_API_URL || ''
const baseURL = raw && !/^https?:\/\//i.test(raw) ? `http://${raw}` : raw

const apiClient = axios.create({
  baseURL: baseURL || undefined,
  headers: { 'Content-Type': 'application/json' },
})

export default apiClient
