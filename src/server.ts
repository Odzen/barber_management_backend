import path from 'path'

import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import express, { static as s } from 'express'

import auth, { login, currentUser } from './auth'

export const app = express()

// Middlewares
app.set('proxy', 1)
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
)
// app.use(cors())
app.use('/static', s(path.join(__dirname, '../public')))
app.use(urlencoded({ extended: false }))
app.use(auth)

// Auth Routes
app.post('/api/login', json(), login)
app.get('/api/user/current', currentUser)

export default app
