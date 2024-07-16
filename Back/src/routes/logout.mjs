import express from 'express'
import { postLogoutHandler } from '../controllers/logout.mjs'

const logoutRouter = express.Router()

logoutRouter.post('/', postLogoutHandler)

export default logoutRouter
