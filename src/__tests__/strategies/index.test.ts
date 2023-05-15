import { jest, test, expect } from '@jest/globals'
// eslint-disable-next-line import/order
import passport from 'passport'
import jwtStrategy from '../../auth/strategies/jwt.strategy'
// eslint-disable-next-line import/order
import localStrategy from '../../auth/strategies/local.strategy'

test('debería registrar la estrategia de autenticación local', () => {
	const spy = jest.spyOn(passport, 'use')

	// Llama a la función que registra la estrategia local
	 passport.use('local', localStrategy);

	expect(spy).toHaveBeenCalledWith('local', localStrategy)

	// Restaura la función original
	spy.mockRestore()
})

test('debería registrar la estrategia de autenticación JWT', () => {
	const spy = jest.spyOn(passport, 'use')

	// Llama a la función que registra la estrategia JWT
	passport.use('jwt', jwtStrategy)

	expect(spy).toHaveBeenCalledWith('jwt', jwtStrategy)

	// Restaura la función original
	spy.mockRestore()
})
