/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'

function logErrors(
	err: Error,
	_req: Request,
	_res: Response,
	next: NextFunction
) {
	console.error(err)
	next(err)
}

function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	})
}

function boomErrorHandler(
	err: any,
	_req: Request,
	res: Response,
	next: NextFunction
) {
	if (err.isBoom) {
		const { output } = err
		return res.status(output.statusCode).json(output.payload)
	}

	return next(err)
}

export { logErrors, errorHandler, boomErrorHandler }
