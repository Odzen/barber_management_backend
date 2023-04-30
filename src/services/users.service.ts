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
		return this.users.find((user) => user.id === id)
	}
}

export default UsersService
