import { test, expect, describe } from '@jest/globals'
//import passport from 'passport'
import request = require('supertest')

import app from '../server'

//const jwtSecret = process.env.JWT_SECRET_KEY || 'secret'
describe('POST /login', () => {
	//
	test('should return 401 on invalid credentials', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: 'invalid@example.com', password: 'invalidpassword' })

		expect(response.status).toBe(404)
	})
})
