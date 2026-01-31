import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import apiRoutes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}))
app.use(express.json())

app.use('/api', apiRoutes)

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB()
      console.log('MongoDB connected')
    } catch (err) {
      console.error('MongoDB connection failed:', err.message)
    }
  }
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

start()
