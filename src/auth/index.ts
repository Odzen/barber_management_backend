import passport from 'passport'

import jwtStrategy from './strategies/jwt.strategy'
import localStrategy from './strategies/local.strategy'

console.log('Index Auth')

passport.use('local', localStrategy)
passport.use('jwt', jwtStrategy)
