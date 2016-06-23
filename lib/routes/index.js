'use strict'

function index (req, res, next) {
  res.send('Competency API')
  next()
}

module.exports = {
  index,
  users: require('./users'),
  proficiencies: require('./proficiencies'),
  employment: require('./employment'),
  occupations: require('./occupations'),
  profiles: require('./profiles')
}
