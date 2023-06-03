import { unauthorized } from '@hapi/boom'

import type { PrismaClient, Service, Prisma, User } from '@prisma/client'

export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export const resolver: Record<keyof Service, (parent: Service) => unknown> = {
	id: (parent) => parent.id,
	createdAt: (parent) => parent.createdAt,
	updatedAt: (parent) => parent.updatedAt,
	name: (parent) => parent.name,
	price: (parent) => parent.price,
}

export async function findAll(
	_parent: unknown,
	args: { where?: Prisma.ServiceWhereInput; skip?: number; take?: number },
	{ orm, user }: ResolverContext
): Promise<Service[] | null> {
	try {
		if (!user) {
			throw unauthorized('User not found')
		}
		const services = await orm.service.findMany({
			where: args.where,
			skip: args.skip,
			take: args.take,
		})
		return services
	} catch (e) {
		console.log('Error: ', e)
		throw e
	}
}

export async function findOne(
	_parent: unknown,
	args: { id: string },
	{ orm, user }: ResolverContext
): Promise<Service | null> {
	if (!user) {
		throw unauthorized('User not found')
	}
	try {
		const service = await orm.service.findUnique({
			where: {
				id: args.id,
			},
		})
		return service
	} catch (e) {
		console.log('Error: ', e)
		throw e
	}
}

export async function createService(
	_parent: unknown,
	{
		data,
	}: {
		data: Pick<Service, 'name' | 'price'>
	},
	{ orm, user }: ResolverContext
): Promise<Service | null> {
	if (!user) {
		throw unauthorized('User not found')
	}

	const { name, price } = data

	try {
		const service = await orm.service.create({
			data: {
				name,
				price,
			},
		})

		return service
	} catch (e) {
		console.log('Error creating Service: ', e)
		throw e
	}
}

export async function updateService(
	_parent: unknown,
	{
		id,
		data,
	}: {
		id: string
		data: Pick<Service, 'name' | 'price'>
	},
	{ orm, user }: ResolverContext
): Promise<Service | null> {
	if (!user) {
		throw unauthorized('User not found')
	}

	const { name, price } = data

	try {
		const service = await orm.service.update({
			where: {
				id,
			},
			data: {
				name,
				price,
			},
		})

		return service
	} catch (e) {
		console.log('Error updating Service: ', e)
		throw e
	}
}
