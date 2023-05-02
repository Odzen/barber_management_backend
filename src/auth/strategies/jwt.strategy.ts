import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const jwtSecret = process.env.JWT_SECRET_KEY || 'secret'

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
}

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
	try {
		done(null, payload)
	} catch (error) {
		done(error)
	}
})

export default jwtStrategy
