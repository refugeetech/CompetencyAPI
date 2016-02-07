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
  user['@timestamp'] = new Date()

  let param = {
    index: 'user',
    type: 'user',
    id: user.id,
    doc: user,
    doc_as_upsert: true
  }

  return client.update(params)
    .then(user => ({ userId: user._id }))
}

module.exports = {
  saveUser,
  init
}
