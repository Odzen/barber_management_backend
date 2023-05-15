/* eslint-disable import/no-unresolved */
import { jest, expect, describe, test } from '@jest/globals'
import morgan from 'morgan'
import request from 'supertest'

//import app from '../server'
import app from '../../server'

describe('Testing the server', () => {
	const port = parseInt(process.env.PORT) || 3000
	//probando el inicio del servidor
	test('Server starts successfully', async () => {
		//console.log(port)
		const server = app.listen(port)
		expect(server).toBeDefined()
		server.close()
	})
	// probando la respuesta de la ruta
	test('GET / responds with 200 status code', async () => {
		const res = await request(app).get('/')
		expect(res.status).toBe(200)
	})
	//verificando uso del modulo morgan
	test('Morgan middleware is being used', async () => {
		const morganSpy = jest.fn()
		app.use(morgan('dev'))
		await request(app).get('/')
		expect(morganSpy.mock.calls.length > 0).toBe(false)
	})
})
