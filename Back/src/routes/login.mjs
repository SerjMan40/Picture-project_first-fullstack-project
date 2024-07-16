import express from 'express'
import { postLoginHandler } from '../controllers/login.mjs'

const loginRouter = express.Router()

loginRouter.post('/',  postLoginHandler)

export default loginRouter
