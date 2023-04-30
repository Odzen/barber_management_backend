import { urlencoded } from 'body-parser'
import cors from 'cors'
import express, { json } from 'express'

import { __prod__ } from './constants'
import { errorMiddleware } from './middlewares/error.handler'
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

routerApi(app)
app.use('/api', routerApi)

app.use(errorMiddleware.logErrors)
app.use(errorMiddleware.boomErrorHandler)
app.use(errorMiddleware.errorHandler)

export default app
