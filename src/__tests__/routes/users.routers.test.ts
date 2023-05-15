import { test, expect, jest, describe } from '@jest/globals'
import express from 'express'
import supertest from 'supertest'

import router from '../../routes'
import UsersService from '../../services/users.service'

// eslint-disable-next-line @typescript-eslint/no-var-requires

const userService = new UsersService()

const app = express()
app.use('/', router)

describe('User Routes', () => {
	test('debería llamar a next con el error si ocurre un error en la búsqueda del usuario', async () => {
		const error = new Error('Error al buscar el usuario')
		jest.spyOn(userService, 'findOne').mockRejectedValue(error)
		const response = await supertest(app).get('/123')
		expect(response.status).toBe(500)
		expect(response.body).toBeDefined()
	})
})

describe('PATCH /users/:id', () => {
	test('debería devolver un error si ocurre un error en la actualización del usuario', async () => {
		// 1. Preparar el estado inicial
		const userId = '123'
		const updatedUserData = {
			name: 'Ramiro Cuero',
			email: 'ramiro@example.com',
		}
		//Mockear la función `userService.update` para simular un error
		const error = new Error('Error al actualizar el usuario')
		jest.spyOn(userService, 'update').mockRejectedValue(error)

		//Ejecutar la función que se va a probar
		const response = await supertest(app)
			.patch(`/users/${userId}`)
			.set('Authorization', 'Bearer <token>')
			.send(updatedUserData)

		// Realizar las comprobaciones o assertions
		expect(response.status).toBe(500)
		expect(response.body).toBeDefined()
	})
})
