'use strict'

const errors = require('restify').errors
const BadRequestError = errors.BadRequestError
const elastic = require('../adapters/elastic')


function update (req, res, next) {
  let phoneNumber = req.params.id

  if (!phoneNumber) {
    return next(new BadRequestError('Missing Phone Number'))
  }

  if (!phoneNumber.match(/^([+]46|0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/)) {
    return next(new BadRequestError('Malformed Phone Number'))
  }

  phoneNumber = phoneNumber.replace('+46', '0')

  const payload = Object.assign(req.body, {
    id: phoneNumber
  })

  return elastic
    .saveUser(payload)
    .then(userId => res.send(userId))
    .then(_ => next())
    .catch(next)
}

function get (req, res, next) {
  return elastic.getUser(req.params.id)
    .then(user => res.send(user))
    .catch(next)
}

module.exports = {
  update,
  get: get
}

