import { urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'

export const app = express()

// Middlewares
app.set('proxy', 1)
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
)
app.use(urlencoded({ extended: false }))

// Auth Routes

app.get('/', (_req, res) => {
	res.send('Hello from Barber API Production!')
})

export default app
