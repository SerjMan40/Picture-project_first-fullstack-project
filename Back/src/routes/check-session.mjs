import express from 'express'

import { checkSession } from '../controllers/check-session.mjs'

const checkSessionRouter = express.Router()

checkSessionRouter.get('/', checkSession)

export default checkSessionRouter
