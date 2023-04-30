import { Application } from 'express'

import users from './users.router'

function routerApi(app: any) {
	app.use('/api/users', users)
}

export default routerApi
