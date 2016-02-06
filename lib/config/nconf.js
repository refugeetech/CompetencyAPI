const nconf = require('nconf')
const fs = require('fs')

nconf.argv()
  .env({
    separator: '__',
    lowerCase: true
  })
  .file({file: 'config.json'})

module.exports = nconf