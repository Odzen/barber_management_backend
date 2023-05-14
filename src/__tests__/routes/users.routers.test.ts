import { test, expect, jest, describe } from '@jest/globals'
import express, { Router } from 'express'
import passport from 'passport'
import request from 'supertest'

import UsersService from '../../services/users.service'

const router = Router()
const userService = new UsersService()

//verificando la optencion de usurios por id en la ruta get/:id
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
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

const app = express()
app.use('/', router)

describe('User Routes', () => {
	test('debería llamar a next con el error si ocurre un error en la búsqueda del usuario', async () => {
		const error = new Error('Error al buscar el usuario')
		jest.spyOn(userService, 'findOne').mockRejectedValue(error)
		const response = await request(app).get('/123')
		expect(response.status).toBe(500)
		expect(response.body).toBeDefined()
	})
})
