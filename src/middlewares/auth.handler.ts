import { forbidden } from '@hapi/boom'
import { ROLE, User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

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

async function getUserFromToken(token: string): Promise<User | undefined> {
	return new Promise((resolve) => {
		passport.authenticate(
			'jwt',
			{ session: false },
			(err: any, user: User | undefined) => {
				if (err || !user) {
					return resolve(undefined)
				}
				resolve(user)
			}
		)({ headers: { authorization: token } })
	})
}

export { checkAdminRole, getUserFromToken }
