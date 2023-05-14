import { expect, it, describe, beforeAll } from '@jest/globals'
//import { Router } from 'express';
import supertest from 'supertest'

import app from '../../server' // Importa  aplicación express desde '../server'

//const router = Router();
const request = supertest(app) // Utilizando supertest para crear una instancia de solicitud HTTP

describe('GET /', () => {
	let token: string

	beforeAll((done) => {
		// Autenticación del usuario admin para obtener el token JWT
		request
			.post('/auth/login')
			.send({
				email: 'admin@test.com',
				password: 'admin',
			})
			.end((err, response) => {
				if (err) return done(err)
				token = response.body.token
				done()
			})
	})

	describe('GET /users', () => {
		it('should return a list of users', async () => {
			const response = await request
				.get('/users')
				.set('Authorization', `Bearer ${token}`)
			expect(response.status).toBe(200) //esperado 200 solo por probar(para mi)
			expect(response.body.message).toBe('ok')
			expect(response.body.data).toBeInstanceOf(Array)
		})
	})
})
