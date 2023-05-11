import { expect, it, describe, jest } from '@jest/globals'
import { Request, Response } from 'express'

import { logErrors } from '../middlewares/error.handler'

describe('logErrors middleware', () => {
	it('debería imprimir el error en la consola y pasar el control al siguiente middleware', () => {
		const err = new Error('Este es un error de prueba')
		const req = {} as Request
		const res = {} as Response
		const next = jest.fn()

		const consoleErrorMock = jest
			.spyOn(console, 'error')
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.mockImplementation(() => {})
		logErrors(err, req, res, next)

		expect(consoleErrorMock).toHaveBeenCalled()
		expect(consoleErrorMock).toHaveBeenCalledWith(err)
		expect(next).toHaveBeenCalled()
		expect(next).toHaveBeenCalledWith(err)

		consoleErrorMock.mockRestore()
	})
})
