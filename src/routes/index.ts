import { Application } from 'express'

import users from './users.router'

function routerApi(app: Application) {
	app.use('/api/users', users)
}

export default routerApi
