import { notFound } from '@hapi/boom'
import {beforeEach, describe, test, expect } from '@jest/globals'
import { User } from '@prisma/client';

import UsersService from '../../services/users.service'

describe('UsersService', () => {
	let usersService: UsersService; // Declarar usersService como una variable
  
	beforeEach(() => {
	  usersService = new UsersService(); // Crear una nueva instancia de UsersService antes de cada test
	});
  
	describe('findOne', () => {
	  test('should throw notFound error', async () => {
		await expect(usersService.findOne('1')).rejects.toThrowError(
		  notFound('user not found')
		);
	  });
	});
  
	// Resto de los métodos
  
	describe('delete', () => {
	  test('should delete a user', async () => {
		// Crear un usuario de prueba para luego eliminarlo
		const user: User = {
			id: '1',
			email: 'test@example.com',
			password: 'password',
			birthDate: new Date('2000-01-01'),
			name: '',
			documentNumber: '',
			phone: '',
			urlImg: null,
			state: 'ACTIVE',
			role: 'ADMIN',
			updatedAt: null,
			createdAt: new Date,
		};
		await usersService.create(user); // Crear el usuario antes de eliminarlo
  
		const result = await usersService.delete('1');
		expect(result).toBeUndefined();
	  });
	});
  });

// function beforeEach(arg0: () => void) {
// 	throw new Error('Function not implemented.')
// }
  