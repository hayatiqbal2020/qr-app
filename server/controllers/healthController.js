import { getDB } from '../db.js'

/**
 * GET /api/health – health check and optional DB ping
 */
export async function health(req, res) {
  const payload = { status: 'ok', message: 'PayQR API is running' }
  if (process.env.MONGODB_URI) {
    try {
      const db = getDB()
      await db.command({ ping: 1 })
      payload.db = 'connected'
    } catch (err) {
      payload.db = 'error'
      payload.dbError = err.message
    }
  }
  res.json(payload)
}
