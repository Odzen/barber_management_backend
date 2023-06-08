import { unauthorized } from '@hapi/boom'
import { jest, describe, test, expect } from '@jest/globals'
import { compare } from 'bcrypt'

import router from '../../routes/auth.router'
import app from '../../server'

jest.mock('../../services/users.service')

describe('localStrategy', () => {
	//verificando autenticacion con datos correctos
	test('should authenticate user with valid credentials', async () => {
		app.post('/', () => {
			const email = 'test@barbery.com'
			const hashedPassword = 'hashedPassword'
			const user = { email, password: hashedPassword }
			const done = jest.fn()
			expect(done).toHaveBeenCalledWith(null, user)
		})
	})
	// verificando la respuesta cuando la contraseña es correcta
	test('should return unauthorized if password is invalid', async () => {
		app.post('/', () => {
			const email = 'test@barbery.com'
			const hashedPassword = 'hashedPassword'
			const user = { email, password: hashedPassword }
			const done = jest.fn()
			expect(compare).toHaveBeenCalledWith(hashedPassword, user.password)
			expect(done).toHaveBeenCalledWith(unauthorized('invalid password'), false)
		})
	})
	// verificando la respuesta de la funcion cuando ocurre
	//un error en la autenticacion
	test('should return error if an error occurs during authentication', async () => {
		app.post('/', () => {
			const done = jest.fn()
			expect(done).toHaveBeenCalledWith(Error, false)
		})
	})
	// Prueba de configuración del enrutador
	test('should configure local authentication strategy in the router', () => {
		expect(router.stack).toHaveLength(1) // Verifica que solo haya una ruta configurada en el enrutador
		expect(router.stack[0].route.path).toBe('/login') // Verifica que la ruta sea '/login'
		expect(router.stack[0].route.methods).toHaveProperty('post') // Verifica que la ruta permita el método POST
		expect(router.stack[0].route.stack).toHaveLength(2) // Verifica que se hayan configurado dos middlewares para la ruta
	})
})
