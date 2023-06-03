//import { notFound } from '@hapi/boom'
//import { notFound } from '@hapi/boom'
import { notFound } from '@hapi/boom'
import { beforeEach, describe, test, expect } from '@jest/globals'
//import { User } from '@prisma/client'
import { PrismaClient, User } from '@prisma/client'
import { hash } from 'bcrypt'
import { Options } from 'body-parser'

import UsersService from '../../services/users.service'

export default class UsersService {
	private prisma: PrismaClient

	constructor() {
		this.prisma = new PrismaClient()
	}

	async findMany(options: Options) {
		return await this.prisma.user.findMany(options)
	}

	async findOne(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		})
		if (!user) throw notFound('user not found')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user

		return userWithoutPassword
	}

	async findByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
		})

		return user
	}

	async create(user: User) {
		const hashedPassword = await hash(user.password, 10)
		const birthDate = new Date(user.birthDate).toISOString()
		const newUser = await this.prisma.user.create({
			data: { ...user, password: hashedPassword, birthDate },
		})

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...newUserWithoutPassword } = newUser

		return newUserWithoutPassword
	}

	async update(id: string, user: User) {
		return await this.prisma.user.update({
			where: { id },
			data: user,
		})
	}

	async delete(id: string) {
		return await this.prisma.user.delete({
			where: { id },
		})
	}
}

describe('UsersService', () => {
	let usersService: UsersService

	beforeEach(() => {
		usersService = new UsersService()
	})

	describe('findMany', () => {
		test('should return an empty array', async () => {
			const result = await usersService.findMany({})
			expect(result).toEqual([])
		})
	})

	// describe('findOne', () => {
	// 	test('should throw notFound error', async () => {
	// 		await expect(usersService.findOne('1')).rejects.toThrowError(
	// 			notFound('user not found')
	// 		)
	// 	})
	// })

	// describe('create', () => {
	// 	test('should create a new user', async () => {
	// 		const newUser: User = {
    //             id: '1',
    //             name: 'John Doe',
    //             email: 'john@example.com',
    //             password: 'password',
    //             birthDate: new Date(19900101),
    //             documentNumber: '',
    //             phone: '',
    //             urlImg: null,
    //             state: 'ACTIVE',
    //             role: 'ADMIN',
    //             createdAt: undefined,
    //             updatedAt: null
    //         }

	// 		const result = await usersService.create(newUser)
	// 		expect(result).toEqual({
	// 			id: '1',
	// 			name: 'John Doe',
	// 			email: 'john@example.com',
	// 			birthDate: '1990-01-01',
	// 		})
	// 	})
	// })

	// Resto de los métodos

	// describe('delete', () => {
	// 	test('should delete a user', async () => {
	// 		const result = await usersService.delete('1')
	// 		expect(result).toBeUndefined()
	// 	})
	// })
})
