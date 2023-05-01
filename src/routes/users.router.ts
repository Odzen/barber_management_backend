import { Router } from 'express'

import validationHandler from '../middlewares/validator.handler'
import {
	getUserSchema,
	createUserSchema,
	queryUserSchema,
} from '../schemas/user.schema'
import UsersService from '../services/users.service'

const router = Router()
const userService = new UsersService()

router.get(
	'/',
	validationHandler(queryUserSchema, 'query'),
	async (req, res, next) => {
		try {
			let options = {}
			if (req.query) {
				const orderByKey = req.query.orderBy
				const skipReq = req.query.skip as string
				const takeReq = req.query.take as string
				options = {
					skip: parseInt(skipReq) || 0,
					take: parseInt(takeReq) || 10,
					orderBy: {
						[`${orderByKey ?? 'createdAt'}`]: req.query.orderDirection || 'asc',
					},
				}
			}

			const users = await userService.findMany(options)
			res.json({
				message: 'ok',
				data: users,
			})
		} catch (error) {
			next(error)
		}
	}
)

router.get(
	'/:id',
	validationHandler(getUserSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params
			const user = await userService.findOne(id)
			res.json(user)
		} catch (error) {
			next(error)
		}
	}
)

router.post(
	'/',
	validationHandler(createUserSchema, 'body'),
	async (req, res) => {
		const body = req.body
		res.json({
			message: 'created',
			data: body,
		})
	}
)

export default router
