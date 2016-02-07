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

function saveUser(id, user) {
  user.timestampLastupdated = new Date()

  let params = {
    index: 'user',
    type: 'user',
    id: id,
    body: {
      doc: user,
      doc_as_upsert: true
    }
  }

  return client.update(params)
    .then(result => {
      if (result._shards.successful) {
        return {message: 'User is successfully updated'}
      }

      return {message: 'User did not update successfully. Check your payload again.'}
    })
}

function getUser(userId) {
  return client.get({
    index: 'user',
    type: 'user',
    id: userId
  }).then(user => user)

}

function createUser(phone) {
      
  let user = {
    timestampCreated: new Date(),
    phone: phone
  }

  let params = {
    index: 'user',
    type: 'user',
    id: uuid.v4(),
    body: {
      doc: user,
      doc_as_upsert: true
    }
  }

  return client.update(params)
    .then()
    .then(user => ({ userId: user._id }));
}

function getUserByPhone(phone) {
  return client.search({
    index: 'users',
    q: 'phone:' + phone
  })
}

module.exports = {
  getUser,
  saveUser,
  init,
  createUser,
  getUserByPhone
}
