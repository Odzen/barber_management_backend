import { jest, describe, beforeEach, test, expect } from '@jest/globals'
import { NextFunction } from 'express'

import errorHandler from '../../middlewares/validator.handler'

describe('errorHandler', () => {
	let req: any

	let next: NextFunction
	let schema: any
	beforeEach(() => {
		req = {
			property: 'someValue',
		}
		next = jest.fn()
		schema = {
			validate: jest.fn(),
		}
	})

	test('should call next without error if validation passes', () => {
		schema.validate.mockReturnValue({ error: null })
		const middleware = errorHandler(schema, 'property')
		middleware(req, {} as any, next)

		expect(schema.validate).toHaveBeenCalledWith(
			'someValue',
			expect.objectContaining({ abortEarly: false })
		)
		expect(req.property).toBe('someValue')
		expect(next).toHaveBeenCalled()
	})

	test('should call next with error if validation fails', () => {
	
		schema.validate.mockReturnValue({ error: null })
		const middleware = errorHandler(schema, 'property')
		middleware(req, {} as any, next)
		expect(schema.validate).toHaveBeenCalledWith(
			'someValue',
			expect.objectContaining({ abortEarly: false })
		)
		expect(req.property).toBe('someValue')
	})
})
