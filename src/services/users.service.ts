import { notFound } from '@hapi/boom'
import { PrismaClient, User } from '@prisma/client'
import { hash } from 'bcrypt'

interface Options {
	skip?: number
	take?: number
	orderBy?: {
		[key: string]: 'asc' | 'desc'
	}
}

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
		return user
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
		return await this.prisma.user.create({
			data: { ...user, password: hashedPassword, birthDate },
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
