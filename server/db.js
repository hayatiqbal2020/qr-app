import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
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
  // Use database name from URI, or default to 'payqr'
  db = client.db()
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
