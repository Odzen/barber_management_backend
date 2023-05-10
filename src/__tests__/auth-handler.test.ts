import { forbidden } from '@hapi/boom'
import { beforeEach, it, expect, describe, jest } from '@jest/globals'
import { User, ROLE } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

import { checkAdminRole } from '../middlewares/auth.handler'
// testing the function to checks the roles
describe('checkAdminRole', () => {
	let mockRequest: Partial<Request>
	let mockResponse: Partial<Response>
	let mockNextFunction: NextFunction
    const user = { role: ROLE.ADMIN } as User
	beforeEach(() => {
		mockRequest = {}
		mockResponse = {}
		mockNextFunction = jest.fn()
	})

	it('should call next if the user has the appropriate role', () => {
		
		mockRequest.user = user

		checkAdminRole(ROLE.ADMIN)(
			mockRequest as Request,
			mockResponse as Response,
			mockNextFunction
		)

		expect(mockNextFunction).toHaveBeenCalled()
	})

	 it('should call next with forbidden error if the user does not have the appropriate role', () => {
	   // Arrange
       const user = { role: ROLE.BARBER } as User;
	   mockRequest.user = user
	   // Act
	   checkAdminRole(ROLE.ADMIN)(
        mockRequest as Request, 
        mockResponse as Response,
         mockNextFunction
       )
	   // Assert
	   expect(mockNextFunction).toHaveBeenCalledWith(forbidden('The role of the user does not have permissions to perform this action'));
	 });
})
