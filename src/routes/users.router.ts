import { ROLE } from '@prisma/client'
import { Router, RequestHandler } from 'express'
import passport from 'passport'

import { checkAdminRole } from '../middlewares/auth.handler'
import validationHandler from '../middlewares/validator.handler'
import {
	getUserSchema,
	createUserSchema,
	queryUserSchema,
	updateUserSchema,
} from '../schemas/user.schema'
import UsersService from '../services/users.service'

const router = Router()
const userService = new UsersService()

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	validationHandler(queryUserSchema, 'query'),
	(async (req, res, next) => {
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
						[`${orderByKey ?? 'createdAt'}`]: req.query.orderDirection ?? 'asc',
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
	}) as RequestHandler
)

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validationHandler(getUserSchema, 'params'),
	(async (req, res, next) => {
		try {
			const { id } = req.params
			const user = await userService.findOne(id)
			res.json(user)
		} catch (error) {
			next(error)
		}
	}) as RequestHandler
)

router.post('/', validationHandler(createUserSchema, 'body'), (async (
	req,
	res,
	next
) => {
	try {
		const { body } = req
		const user = await userService.create(body)
		res.json({
			message: 'user created',
			data: user,
		})
	} catch (error) {
		next(error)
	}
}) as RequestHandler)

router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validationHandler(updateUserSchema, 'body'),
	(async (req, res, next) => {
		try {
			const { id } = req.params
			const { body } = req

			const user = await userService.update(id, body)
			res.json({
				message: 'user updated',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}) as RequestHandler
)

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	checkAdminRole(ROLE.ADMIN),
	(async (req, res, next) => {
		try {
			const { id } = req.params
			const user = await userService.delete(id)
			res.json({
				message: 'user deleted',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}) as RequestHandler
)

export default router
