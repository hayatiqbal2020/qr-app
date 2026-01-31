import bcrypt from 'bcryptjs'
import { getDB } from '../db.js'

const USERS_COLLECTION = 'users'

/**
 * POST /api/auth/signup – create user and save to MongoDB users collection
 * Body: name (required), mobile (required, 10 digits), email (optional, valid format if present), password (required, min 6)
 */
export async function signup(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ error: 'Database not configured' })
  }
  const { name, mobile, email, password } = req.body
  if (!name || !(name || '').trim()) {
    return res.status(400).json({ error: 'Full name is required' })
  }
  const mobileDigits = (mobile || '').replace(/\D/g, '')
  if (!mobileDigits || mobileDigits.length !== 10) {
    return res.status(400).json({ error: 'A valid 10-digit mobile number is required' })
  }
  if (email !== undefined && email !== null && ('' + email).trim()) {
    const trimmed = ('' + email).trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return res.status(400).json({ error: 'Enter a valid email address' })
    }
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }
  try {
    const db = getDB()
    const users = db.collection(USERS_COLLECTION)
    const existingByMobile = await users.findOne({ mobile: mobileDigits })
    if (existingByMobile) {
      return res.status(409).json({ error: 'An account with this mobile number already exists' })
    }
    const emailVal = email !== undefined && email !== null && ('' + email).trim()
      ? ('' + email).trim().toLowerCase()
      : null
    if (emailVal) {
      const existingByEmail = await users.findOne({ email: emailVal })
      if (existingByEmail) {
        return res.status(409).json({ error: 'An account with this email already exists' })
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const doc = {
      name: (name || '').trim(),
      mobile: mobileDigits,
      password: hashedPassword,
      createdAt: new Date(),
    }
    if (emailVal) doc.email = emailVal
    const result = await users.insertOne(doc)
    res.status(201).json({
      message: 'Account created successfully',
      userId: result.insertedId.toString(),
    })
  } catch (err) {
    console.error('Signup error:', err)
    const isDev = process.env.NODE_ENV !== 'production'
    const message = isDev && err.message
      ? err.message
      : 'Could not create account. Please try again.'
    res.status(500).json({ error: message })
  }
}

/**
 * POST /api/auth/signin – sign in with mobile or email + password
 * Body: mobile (10 digits) OR email, and password (required)
 */
export async function signin(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(503).json({ error: 'Database not configured' })
  }
  const { mobile, email, password } = req.body
  const mobileDigits = (mobile || '').replace(/\D/g, '')
  const emailVal = email !== undefined && email !== null && ('' + email).trim()
    ? ('' + email).trim().toLowerCase()
    : null

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' })
  }
  if (mobileDigits.length === 10 && emailVal) {
    return res.status(400).json({ error: 'Provide either mobile or email, not both' })
  }
  if (mobileDigits.length !== 10 && !emailVal) {
    return res.status(400).json({ error: 'Mobile number (10 digits) or email is required' })
  }

  try {
    const db = getDB()
    const users = db.collection(USERS_COLLECTION)
    const query = mobileDigits.length === 10
      ? { mobile: mobileDigits }
      : { email: emailVal }
    const user = await users.findOne(query)
    if (!user) {
      return res.status(401).json({ error: 'Invalid mobile/email or password' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid mobile/email or password' })
    }
    const payload = {
      message: 'Signed in successfully',
      userId: user._id.toString(),
      name: user.name,
      mobile: user.mobile,
    }
    if (user.email) payload.email = user.email
    res.json(payload)
  } catch (err) {
    console.error('Signin error:', err)
    const isDev = process.env.NODE_ENV !== 'production'
    const message = isDev && err.message
      ? err.message
      : 'Could not sign in. Please try again.'
    res.status(500).json({ error: message })
  }
}
