import { notFound } from '@hapi/boom'
import { PrismaClient, User } from '@prisma/client'

// CRUD for Users table using ORM Prisma and Classes

export class UsersService {
	constructor(private prisma: PrismaClient) {}

	async findMany() {
		return await this.prisma.user.findMany()
	}

	async findOne(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		})
		if (!user) throw notFound('user not found')
		return user
	}

	async create(user: User) {
		return await this.prisma.user.create({
			data: user,
		})
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
