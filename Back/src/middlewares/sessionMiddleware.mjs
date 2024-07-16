import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'

dotenv.config()

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'default_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: false
  }
})

export default sessionMiddleware
