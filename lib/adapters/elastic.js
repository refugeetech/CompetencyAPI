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

  let callback = function (phone) {
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

  return getUserByPhone(phone).then(result => {
    let hits = result.hits.hits

    if (hits.length > 0) {
      return { userId: hits[0]._id }
    }

    return callback(phone)
  }).catch(err => {
    return callback(phone)
  })
}

function getUserByPhone(phone) {
  return client.search({
    index: 'user',
    q: 'phone:' + phone
  })
}

function getProfs(rootId) {
  return client.search({
    index: 'proficiencies',
    type: 'proficiency',
    id: rootId,
    from: 0,
    size: 1000
  })
}

function getChildrenProfs(parentId) {
  return client.search({
    index: 'proficiencies',
    type: 'proficiency',
    q: 'foralder:' + parentId,
    from: 0,
    size: 1000
  })
}

module.exports = {
  getUser,
  saveUser,
  init,
  createUser,
  getUserByPhone,
  init,
  getProfs,
  getChildrenProfs
}
