import { Router } from 'express'

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

router.get('/:id', (req, res) => {
	const { id } = req.params
	const user = userService.findOne(parseInt(id))
	res.json(user)
})

router.post('/', (req, res) => {
	const body = req.body
	res.json({
		message: 'created',
		data: body,
	})
})

export default router
