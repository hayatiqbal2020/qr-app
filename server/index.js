import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB, getDB, closeDB } from './db.js'

const app = express()
const PORT = process.env.PORT || 5000

// CORS: allow your frontend origin (Vite dev + production URL)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}))

app.use(express.json())

// Health check (includes DB ping when MONGODB_URI is set)
app.get('/api/health', async (req, res) => {
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
})

// Example API route – add your own routes here
app.get('/api/example', (req, res) => {
  res.json({ message: 'Hello from PayQR backend' })
})

// 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
