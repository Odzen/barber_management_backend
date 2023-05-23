
import { describe, test, expect, jest } from '@jest/globals'
import { Request, Response } from 'express'

import { checkAdminRole } from '../../middlewares/auth.handler'

describe('Verify that user with the correct role', () => {
	test('User with role allowed must move to the next middleware', () => {
		// Crear un objeto de solicitud simulado con un usuario y un rol permitido
		const req = {
			user: {
				role: 'ADMIN',
			},
		} as unknown as Request

		// Crear un objeto de respuesta simulado
		const res = {} as Response

		// Crear una función simulada para el siguiente middleware
		const next = jest.fn()

		// Llamar a la función checkAdminRole con el rol permitido
		const middleware = checkAdminRole('ADMIN')
		middleware(req, res, next)

		// Verificar que la función next fue llamada sin argumentos
		expect(next).toHaveBeenCalled()
		expect(next.mock.calls[0][0]).toBeUndefined()
	})
	test('User with role not allowed should receive permission denied error', () => {
		// Crear un objeto de solicitud simulado con un usuario y un rol no permitido
		const req = {
			user: {
				role: 'otrorol',
			},
		} as unknown as Request

		// Crear un objeto de respuesta simulado
		const res = {} as Response

		// Crear una función simulada para el siguiente middleware
		const next = jest.fn()

		// Llamar a la función checkAdminRole con los roles permitidos 'admin' y 'editor'
		const middleware = checkAdminRole('ADMIN', 'BARBER')
		middleware(req, res, next)

		// Verificar que la función next fue llamada con el error de permiso denegado
		expect(next).toHaveBeenCalledWith(expect.any(Error))
		expect(next.mock.calls.length).toBe(1)
		expect.stringContaining(
			'The role of the user does not have permissions to perform this action'
		)
	})
})
