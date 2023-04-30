import { urlencoded } from 'body-parser'
import cors from 'cors'
import express, { json } from 'express'

import { __prod__ } from './constants'
import routerApi from './routes'

const app = express()

// Middlewares
app.set('proxy', 1)
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
)
app.use(urlencoded({ extended: false }))
app.use(json())

app.get('/', (_req, res) => {
	res.send(`Hello from Barber API ${__prod__ ? 'Production' : 'Development'}!`)
})

// I want for all the routes to be under /api

routerApi(app)

app.use('/api', routerApi)

export default app
