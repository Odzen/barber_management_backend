import { expect, it, describe, jest } from '@jest/globals'
import { Request, Response,NextFunction } from 'express'

import { logErrors ,errorHandler} from '../middlewares/error.handler'
// probando que la función logErrors imprima el error proporcionado en la consola 
describe('logErrors middleware', () => {
	it('should print the error to the console and pass control to the next middleware', () => {
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
	});
    //probando errorHandler que su respuesta se a un json con un mensaje de error
    it('should send a JSON response with the error message, stack and original error', () => {
        const mockErr = new Error('Test error');
        const mockReq = {} as Request;
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        } as unknown as Response;
        const mockNext = jest.fn() as NextFunction;
    
        errorHandler(mockErr, mockReq, mockRes, mockNext);
    
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: 'Test error',
          stack: mockErr.stack,
          err: mockErr,
        });
      });
});
