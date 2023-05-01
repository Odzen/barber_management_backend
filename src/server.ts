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

const app = express()

const whiteList = process.env.CORS_ORIGINS

const options = {
	origin: (origin: any, callback: any) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
}

// Middlewares
app.set('proxy', 1)
app.use(cors(options))
app.use(morgan('dev'))
app.use(urlencoded({ extended: false }))
app.use(json())

app.get('/', (_req, res) => {
	res.send(`Hello from Barber API ${__prod__ ? 'Production' : 'Development'}!`)
})

routerApi(app)
app.use('/api', routerApi)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

export default app
