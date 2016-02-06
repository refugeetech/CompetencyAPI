'use strict'

const elasticsearch = require('elasticsearch')
const conf = require('../config/nconf')

let client;

function init() {
  client = new elasticsearch.Client({
    host: conf.get('elasticsearch:host') + ':' + conf.get('elasticsearch:port'),
    log: 'trace'
  })
}

function saveUser(user) {
  return client.index({
    index: 'user',
    type: 'user',
    id: user.id,
    body: user
  })
  .then(user => ({userId: user._id}))
}

module.exports = {
  saveUser,
  init
}
