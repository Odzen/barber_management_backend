import { notFound } from '@hapi/boom'

class UsersService {
	constructor() {
		this.users = []
	}

	create(user: any) {
		this.users.push(user)
	}

	find() {
		return this.users
	}

	findOne(id) {
		const user = this.users.find((user) => user.id === id)
		if (!user) {
			throw notFound('User not found')
		}
		return user
	}
}

export default UsersService
