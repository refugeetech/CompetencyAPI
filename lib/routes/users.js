'use strict'

const errors = require('restify').errors
const BadRequestError = errors.BadRequestError
const elastic = require('../adapters/elastic')


function update (req, res, next) {
  return elastic
    .saveUser(req.params.id, req.body)
    .then(result => res.send(result))
    .then(_ => next())
    .catch(next)
}

function get (req, res, next) {
  return elastic.getUser(req.params.id)
    .then(user => res.send(user))
    .catch(next)
}

function create(req, res, next) {
  let phoneNumber = req.body.phoneNumber

  if (!phoneNumber) {
    return next(new BadRequestError('Missing Phone Number'))
  }

  if (!phoneNumber.match(/^([+]46|0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/)) {
    return next(new BadRequestError('Malformed Phone Number'))
  }

  phoneNumber = phoneNumber.replace('+46', '0')

  const payload = Object.assign(req.body, {
    phoneNumber: phoneNumber
  })

  if (!phoneNumber) {
    return next(new BadRequestError('You need a phoneNumber to create a user'))
  }

  return elastic.createUser(phoneNumber)
    .then(userId => res.send(userId))
    .catch(next)
}

module.exports = {
  update,
  get: get,
  create
}
