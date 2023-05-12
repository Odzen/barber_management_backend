import { test, expect, describe } from '@jest/globals'
import { User } from '@prisma/client'
import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import passport from 'passport'
import request = require('supertest')

import app from '../server'

const router = Router()
const jwtSecret = process.env.JWT_SECRET_KEY || 'secret'

describe('POST /login', () => {
	//comprobando respuesta de la funcion router.post es la esperada
	//con datos errados
	test('should return 401 on invalid credentials', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: 'invalid@example.com', password: 'invalidpassword' })

		expect(response.status).toBe(404)
	})
	//comprobando respuesta de la funcion router.post es la esperada
	//con datos correctos
	test('should return 200 and JWT token on successful login', async () => {
		router.post(
			'/login',
			passport.authenticate('local', { session: false }),
			async (req, res, next) => {
				try {
					const user = req.user as User
					const payloadJwt = {
						sub: user.id,
						email: user.email,
						role: user.role,
					}
					const token = sign(payloadJwt, jwtSecret)

					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { password, ...userWithoutPassword } = user

					res.status(200).json({
						message: 'login success',
						data: userWithoutPassword,
						token: token,
					})
				} catch (error) {
					next(error)
				}
			}
		)
	})
})
