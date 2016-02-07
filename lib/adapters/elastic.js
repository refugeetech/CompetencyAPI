'use strict'

const elasticsearch = require('elasticsearch')
const conf = require('../config/nconf')
const uuid = require('node-uuid')

let client;

function init() {
  client = new elasticsearch.Client({
    host: conf.get('elasticsearch:host') + ':' + conf.get('elasticsearch:port'),
    log: 'trace'
  })
}

function saveUser(user) {
  user['@timestamp'] = new Date()
  user.phone = user.id


  let params = {
    index: 'user',
    type: 'user',
    //id: user.id,
    id: uuid.v4(),
    body: {
      doc: user,
      doc_as_upsert: true
    }
  }

  return client.update(params)
    .then()
    .then(user => ({ userId: user._id }))
}

function getUser(userId) {
  return client.search({
    index: 'user',
    type: 'user',
    id: userId
  })
}

module.exports = {
  getUser,
  saveUser,
  init
}
