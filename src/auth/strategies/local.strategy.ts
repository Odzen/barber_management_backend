import { unauthorized } from '@hapi/boom'
import { compare } from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

import UserService from '../../services/users.service'

const userService = new UserService()

const localStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			console.log('Local Strategy: ')
			const user = await userService.findByEmail(email)
			if (!user) {
				console.log('NOT USER')
				return done(unauthorized('invalid email or password'), false)
			}

			const isMatch = await compare(password, user.password)

			if (!isMatch) return done(unauthorized('invalid password'), false)

			done(null, user)
		} catch (error) {
			done(error, false)
		}
	}
)

export default localStrategy
