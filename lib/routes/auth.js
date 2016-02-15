var passport = require('../adapters/passport')

function linkedInAuthenticate () {
  console.log('auth linkedin')
  return passport.authenticate('linkedin', { state: 'SOME STATE' })
}

function linkedInCallback () {
  return passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
}

module.exports = {linkedInAuthenticate, linkedInCallback}
