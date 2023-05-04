import { User } from '@prisma/client'
import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import passport from 'passport'

const router = Router()

const jwtSecret = process.env.JWT_SECRET_KEY || 'secret'

router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user as User
			const payloadJwt = {
				sub: user.id,
				email: user.email,
				role: user.role,
			}
			const token = sign(payloadJwt, jwtSecret)

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...userWithoutPassword } = user

			res.json({
				message: 'login success',
				data: userWithoutPassword,
				token: token,
			})
		} catch (error) {
			next(error)
		}
	}
)

export default router
