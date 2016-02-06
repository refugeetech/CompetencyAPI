const nconf = require('nconf')
const fs = require('fs')

nconf.argv()
  .env()
  .file({file: 'config.json'})

module.exports = nconf