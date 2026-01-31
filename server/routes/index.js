import { Router } from 'express'
import authRoutes from './authRoutes.js'
import healthRoutes from './healthRoutes.js'
import exampleRoutes from './exampleRoutes.js'

const router = Router()

router.use(healthRoutes)
router.use('/auth', authRoutes)
router.use(exampleRoutes)

export default router
