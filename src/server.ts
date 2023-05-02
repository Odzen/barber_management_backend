import { urlencoded } from 'body-parser'
import cors from 'cors'
import express, { json } from 'express'
import morgan from 'morgan'

import { __prod__ } from './constants'
import {
	logErrors,
	boomErrorHandler,
	errorHandler,
} from './middlewares/error.handler'
import routerApi from './routes'

import './auth'

const app = express()

const whiteList = process.env.CORS_ORIGINS?.split(' ') || []

const options = {
	origin: (origin: any, callback: any) => {
		// case for clients like postman
		if (!origin) {
			callback(null, true)
			return
		}

		if (whiteList.length === 0 || whiteList[0].length === 0)
			callback(new Error('Whitelist is empty'))

		const allowed = whiteList.some((domain) => origin.includes(domain))

		if (allowed) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
}

// Middlewares
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors(options))
app.set('proxy', 1)

app.get('/', (_req, res) => {
	res.send(`Hello from Barber API ${__prod__ ? 'Production' : 'Development'}!`)
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

export default app
