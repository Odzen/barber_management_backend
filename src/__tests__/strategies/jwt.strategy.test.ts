import { jest, describe, test, expect } from '@jest/globals'
import jwt from 'jsonwebtoken'

// Mockear la función ExtractJwt.fromAuthHeaderAsBearerToken()
jest.mock('passport-jwt', () => ({
	ExtractJwt: {
		fromAuthHeaderAsBearerToken: jest.fn(),
	},
}))

describe('Autenticación JWT', () => {
	const jwtSecret = 'mySecretKey'

	test('debería firmar y verificar el token JWT', () => {
		const payload = { id: 1, username: 'testuser' }
		// Firmar el token JWT utilizando la clave secreta
		// eslint-disable-next-line import/no-named-as-default-member
		const token = jwt.sign(payload, jwtSecret)
		// Verificar y decodificar el token JWT utilizando la clave secreta
		// eslint-disable-next-line import/no-named-as-default-member
		const decoded: any = jwt.verify(token, jwtSecret)
		// Verificar que los datos decodificados coincidan con el payload original
		expect(decoded.id).toEqual(payload.id)
		expect(decoded.username).toEqual(payload.username)
	})
})
