import * as appointment from './appointment.resolver'
import * as scalars from './scalars'
import * as service from './service.resolver'

import type { Service, Appointment } from '@prisma/client'

export default {
	...scalars,
	BaseModel: {
		__resolveType: (parent: Service | Appointment) => {
			if (parent.id) {
				return 'Model'
			}
			return null // No more implementations
		},
	},
	Query: {
		service: service.findOne,
		services: service.findAll,
		appointment: appointment.findOne,
		appointments: appointment.findAll,
	},
	Mutation: {
		createService: service.createService,
		updateService: service.updateService,
		createAppointment: appointment.createAppointment,
		updateAppointment: appointment.updateAppointment,
	},
	Service: service.resolver,
	Appointment: appointment.resolver,
}
