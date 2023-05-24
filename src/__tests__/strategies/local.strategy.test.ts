import { unauthorized } from '@hapi/boom'
import {
	jest,
	describe,
	beforeEach,
	afterEach,
	test,
	expect,
} from '@jest/globals'
import { compare } from 'bcrypt'
import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local'

import app from '../../server'
import UserService from '../../services/users.service'

jest.mock('../../services/users.service')

describe('localStrategy', () => {
	let localStrategy: LocalStrategy
	let userService: UserService

	beforeEach(() => {
		userService = new UserService()

		localStrategy = new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: 'email',
				passwordField: 'password',
			},
			async (
				_req: any,
				email: string,
				password: string,
				done: (
					error: any,
					user?: Express.User | false,
					options?: IVerifyOptions
				) => void
			) => {
				try {
					const user = await userService.findByEmail(email)
					if (!user) {
						return done(unauthorized('invalid email or password'), false)
					}

					const isMatch = await compare(password, user.password)

					if (!isMatch) return done(unauthorized('invalid password'), false)

					done(null, user)
				} catch (error) {
					done(error, false)
				}
			}
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})
	//verificando autenticacion con datos correctos
	test('should authenticate user with valid credentials', async () => {
		app.post('/', (req: Request) => {
			const email = 'test@barbery.com'
			const hashedPassword = 'hashedPassword'
			const user = { email, password: hashedPassword }
			userService.findByEmail(email)
			const done = jest.fn()
			localStrategy.authenticate(req as any, done)

			expect(userService.findByEmail).toHaveBeenCalledWith(email)
			expect(done).toHaveBeenCalledWith(null, user)
		})
	})
	// verificando la respuesta cuando la contraseña es correcta
	test('should return unauthorized if password is invalid', async () => {
		app.post('/', (req: Request) => {
			const email = 'test@barbery.com'
			const hashedPassword = 'hashedPassword'
			const user = { email, password: hashedPassword }
			userService.findByEmail(email)
			const done = jest.fn()
			localStrategy.authenticate(req as any, done)
			expect(userService.findByEmail).toHaveBeenCalledWith(email)
			expect(compare).toHaveBeenCalledWith(hashedPassword, user.password)
			expect(done).toHaveBeenCalledWith(unauthorized('invalid password'), false)
		})
	})
	// verificando la respuesta de la funcion cuando ocurre
	//un error en la autenticacion
	test('should return error if an error occurs during authentication', async () => {
		app.post('/', (req: Request) => {
			const email = 'test@barbery.com'
			userService.findByEmail(email)
			const done = jest.fn()
			localStrategy.authenticate(req as any, done)

			expect(userService.findByEmail).toHaveBeenCalledWith(email)
			expect(done).toHaveBeenCalledWith(Error, false)
		})
	})
});
