import passport from 'passport'

import jwtStrategy from './strategies/jwt.strategy'
import localStrategy from './strategies/local.strategy'

passport.use('local', localStrategy)
passport.use('jwt', jwtStrategy)
