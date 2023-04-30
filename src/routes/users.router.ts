import { Router } from 'express'

import validationHandler from '../middlewares/validator.handler'
import {
	getUserSchema,
	updateUserSchema,
	createUserSchema,
} from '../schemas/user.schema'
import UsersService from '../services/users.service'

const router = Router()
const userService = new UsersService()

router.get('/', (_req, res) => {
	const users = userService.find()
	res.json({
		message: 'ok',
		data: users,
	})
})

router.get(
	'/:id',
	validationHandler(getUserSchema, 'params'),
	(req, res, next) => {
		try {
			const { id } = req.params
			const user = userService.findOne(parseInt(id))
			res.json(user)
		} catch (error) {
			next(error)
		}
	}
)

router.post('/', validationHandler(createUserSchema, 'body'), (req, res) => {
	const body = req.body
	res.json({
		message: 'created',
		data: body,
	})
})

export default router
