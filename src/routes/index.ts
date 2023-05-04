import { Application, Router } from 'express'

import auth from './auth.router'
import users from './users.router'

function routerApi(app: Application) {
	const router = Router()
	app.use('/api/', router)
	router.use('/auth', auth)
	router.use('/users', users)
}

export default routerApi
