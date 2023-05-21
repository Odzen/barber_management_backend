import * as avo from './avocado.resolver'
import * as scalars from './scalars'
import * as service from './service.resolver'

import type { Avocado, Service } from '@prisma/client'

export default {
	...scalars,
	BaseModel: {
		__resolveType: (parent: Avocado | Service) => {
			if (parent.name) {
				return 'Avocado'
			}
			return null // No more implementations
		},
	},
	Query: {
		avo: avo.findOne,
		avos: avo.findAll,
		service: service.findOne,
		services: service.findAll,
	},
	Mutation: {
		createAvo: avo.createAvo,
		createService: service.createService,
		updateService: service.updateService,
	},
	Avocado: avo.resolver,
}
