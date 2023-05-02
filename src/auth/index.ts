import passport from 'passport'

import LocalStrategy from './strategies/local.strategy'

console.log('Index Auth')

passport.use('local', LocalStrategy)
