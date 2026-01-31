import { Router } from 'express'
import * as exampleController from '../controllers/exampleController.js'

const router = Router()

router.get('/example', exampleController.example)

export default router
