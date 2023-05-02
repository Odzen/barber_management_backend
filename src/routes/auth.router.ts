import { Router } from 'express'
import passport from 'passport'
const router = Router()

router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			console.log('login')
			const { user } = req
			res.json({
				message: 'login success',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}
)

export default router
