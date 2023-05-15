import { jest, describe, test, expect } from '@jest/globals'
import { Router } from 'express'

import auth from '../../routes/auth.router'
import users from '../../routes/users.router'

export function configureRouter(router: Router): void {
	router.use('/auth', auth)
	router.use('/users', users)
}
describe('routerApi', () => {
	test('debería configurar las rutas correctamente', async () => {
		const router = Router()
		jest.spyOn(router, 'use')//espiando las rutas
		configureRouter(router)

		// Verificar que se haya llamado a router.use() con los manejadores de ruta correctos
		expect(router.use).toHaveBeenCalledWith('/auth', auth)
		expect(router.use).toHaveBeenCalledWith('/users', users)
	})
})
