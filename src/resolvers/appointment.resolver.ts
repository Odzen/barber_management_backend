import { unauthorized } from '@hapi/boom'

import type { PrismaClient, Appointment, Prisma, User } from '@prisma/client'

export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export const resolver: Record<
	keyof Appointment,
	(parent: Appointment) => unknown
> = {
	id: (parent) => parent.id,
	customerId: (parent) => parent.customerId,
	barberId: (parent) => parent.barberId,
	serviceId: (parent) => parent.serviceId,
	appointmentDate: (parent) => parent.appointmentDate,
	state: (parent) => parent.state,
	createdAt: (parent) => parent.createdAt,
	updatedAt: (parent) => parent.updatedAt,
}

export async function findAll(
	_parent: unknown,
	args: { where?: Prisma.AppointmentWhereInput; skip?: number; take?: number },
	{ orm, user }: ResolverContext
): Promise<Appointment[] | null> {
	try {
		if (!user) {
			throw unauthorized('User not found')
		}
		const appointments = await orm.appointment.findMany({
			where: args.where,
			skip: args.skip,
			take: args.take,
		})
		return appointments
	} catch (e) {
		console.log('Error: ', e)
		throw e
	}
}

export async function findOne(
	_parent: unknown,
	args: { id: string },
	{ orm, user }: ResolverContext
): Promise<Appointment | null> {
	if (!user) {
		throw unauthorized('User not found')
	}
	try {
		const appointment = await orm.appointment.findUnique({
			where: {
				id: args.id,
			},
		})
		return appointment
	} catch (e) {
		console.log('Error: ', e)
		throw e
	}
}

export async function createAppointment(
	_parent: unknown,
	{
		data,
	}: {
		data: Pick<
			Appointment,
			'customerId' | 'barberId' | 'serviceId' | 'appointmentDate' | 'state'
		>
	},
	{ orm, user }: ResolverContext
): Promise<Appointment | null> {
	if (!user) {
		throw unauthorized('User not found')
	}

	const { customerId, barberId, serviceId, appointmentDate, state } = data

	try {
		const appointment = await orm.appointment.create({
			data: {
				customerId,
				barberId,
				serviceId,
				appointmentDate,
				state,
			},
		})

		return appointment
	} catch (e) {
		console.log('Error creating Appointment: ', e)
		throw e
	}
}

export async function updateAppointment(
	_parent: unknown,
	{
		id,
		data,
	}: {
		id: string
		data: Pick<
			Appointment,
			'customerId' | 'barberId' | 'serviceId' | 'appointmentDate' | 'state'
		>
	},
	{ orm, user }: ResolverContext
): Promise<Appointment | null> {
	if (!user) {
		throw unauthorized('User not found')
	}

	const { customerId, barberId, serviceId, appointmentDate, state } = data

	try {
		const appointment = await orm.appointment.update({
			where: {
				id,
			},
			data: {
				customerId,
				barberId,
				serviceId,
				appointmentDate,
				state,
			},
		})

		return appointment
	} catch (e) {
		console.log('Error updating Appointment: ', e)
		throw e
	}
}
