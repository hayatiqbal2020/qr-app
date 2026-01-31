import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

// Load .env from server directory so it works when running from project root
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') })

const uri = process.env.MONGODB_URI
const dbName = process.env.DB_NAME || 'db_qr-app'
let client = null
let db = null

/**
 * Connect to MongoDB. Call once at startup.
 * @returns {Promise<import('mongodb').Db>}
 */
export async function connectDB() {
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment')
  }
  if (db) return db
  client = new MongoClient(uri)
  await client.connect()
  db = client.db(dbName)
  return db
}

/**
 * Get the current database instance. Must call connectDB() first.
 */
export function getDB() {
  if (!db) throw new Error('Database not connected. Call connectDB() first.')
  return db
}

/**
 * Close the MongoDB connection. Call on graceful shutdown.
 */
export async function closeDB() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}
