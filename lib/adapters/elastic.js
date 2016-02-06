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
  return new Promise((resolve, reject) => {
    resolve({userId: ''})
  })
}

module.exports = {
  saveUser: saveUser,
  init: init
}
