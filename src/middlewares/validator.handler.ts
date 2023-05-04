import { badRequest } from '@hapi/boom'
import { Response, NextFunction } from 'express'

function errorHandler(schema: any, property: string) {
	return (req: any, _res: Response, next: NextFunction) => {
		const value = req[property]
		const { error } = schema.validate(value, { abortEarly: false })

		if (error) {
			next(badRequest(error))
		} else {
			req[property] = value
			next()
		}
	}
}

export default errorHandler
