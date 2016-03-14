'use strict'

function index (req, res, next) {
  res.send('I am alive')
  next()
}

module.exports = {
  index,
  users: require('./users'),
  proficiencies: require('./proficiencies'),
  employment: require('./employment')
}
