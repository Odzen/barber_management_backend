import { forbidden } from '@hapi/boom'
import { ROLE, User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

function checkAdminRole(...roles: ROLE[]) {
	return (req: Request, _res: Response, next: NextFunction) => {
		const user = req.user as User

		if (roles.includes(user.role)) {
			next()
		} else {
			next(
				forbidden(
					'The role of the user does not have permissions to perform this action'
				)
			)
		}
	}
}

export { checkAdminRole }
