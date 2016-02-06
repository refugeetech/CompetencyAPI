'use strict'

const elasticsearch = require('elasticsearch')
const conf = require('../config/nconf')

let client;

function init() {
  client = new elasticsearch.Client({
    host: conf.get('elasticsearch:host') + ':' + conf.get('elasticsearch:port'),
    log: 'trace'
  })

  client.ping({
    requestTimeout: Infinity,
  }, error => {
    if (error) {
      console.log(error)
    }
    else {
      console.log('yelo!')
    }
  })
}

function saveUser() {
  return new Promise((resolve, reject) => {
    resolve({userId: ''})
  })
}

module.exports = {
  saveUser: saveUser,
  init: init
}
