'use strict'

const errors = require('restify').errors
const BadRequestError = errors.BadRequestError
const elastic = require('../adapters/elastic')

function create (req, res, next) {
  if (!req.body.phoneNumber) {
    return next(new BadRequestError('Missing Phone Number'))
  }

  return elastic
    .save(req.body)
    .then(userId => res.send(userId))
    .then(_ => next())
    .catch(next)
}

function update (req, res, next) {

}

module.exports = {
  create,
  update
}
