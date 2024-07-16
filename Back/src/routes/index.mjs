import express from 'express'

import errorHandler from '../middlewares/errorHandler.mjs'

import registerRouter from './register.mjs'
import loginRouter from './login.mjs'
import logoutRouter from './logout.mjs'
import checkSessionRouter from './check-session.mjs'
import itemsRouter from './items.mjs'

const router = express.Router()

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/check-session', checkSessionRouter)
router.use('/items', itemsRouter)




router.use(errorHandler)
router.use('/logout', logoutRouter)

export default router
