var passport = require('passport')
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const conf = require('../config/nconf')
const elastic = require('./elastic')

passport.use(new LinkedInStrategy(conf.get('linkedin'), function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    console.log('profile', profile)
    return elastic.saveUser(profile.id, profile).then(done)
  })
}))

module.exports = passport
