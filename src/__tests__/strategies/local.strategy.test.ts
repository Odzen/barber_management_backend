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
import supertest from 'supertest'

import router from '../../routes/auth.router'
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
	// Prueba de error al buscar el usuario por correo electrónico
	test('should return error if an error occurs when searching for user by email', async () => {
		const email = 'testbarbery.com'
		userService.findByEmail(email)
		const response = await supertest(app)
			.post('/login')
			.send({ email })
		expect(userService.findByEmail).toHaveBeenCalledWith(email)
		expect(response.status).toBe(404)
	})
	// Prueba de respuesta JSON en el manejo de errores
	test('should return JSON error response when authentication error occurs', async () => {
		const email = 'test@example.com'
		const error = new Error('Something went wrong')
		userService.findByEmail(email)
		const done = jest.fn().mockImplementation(() => done(error, false))
		const response = await supertest(app).post('/login').send({ email })
		expect(userService.findByEmail).toHaveBeenCalledWith(email)
		expect(response.status).toBe(404)	
	})

	// Prueba de configuración del enrutador
	test('should configure local authentication strategy in the router', () => {
		expect(router.stack).toHaveLength(1) // Verifica que solo haya una ruta configurada en el enrutador
		expect(router.stack[0].route.path).toBe('/login') // Verifica que la ruta sea '/login'
		expect(router.stack[0].route.methods).toHaveProperty('post') // Verifica que la ruta permita el método POST
		expect(router.stack[0].route.stack).toHaveLength(2) // Verifica que se hayan configurado dos middlewares para la ruta
	})
})
