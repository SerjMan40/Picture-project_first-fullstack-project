import express from 'express'

import { postRegisterHandler } from '../controllers/register.mjs'

const registerRouter = express.Router()

registerRouter.post('/', postRegisterHandler)

export default registerRouter
