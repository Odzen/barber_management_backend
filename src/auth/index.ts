import passport from 'passport'

import localStrategy from './strategies/local.strategy'

console.log('Index Auth')

passport.use('local', localStrategy)
