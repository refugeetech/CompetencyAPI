'use strict'

const errors = require('restify').errors
const BadRequestError = errors.BadRequestError

function create (req, res, next) {
  if (!req.body.phoneNumber) {
    return next(new BadRequestError('Missing Phone Number'))
  }
}

function update (req, res, next) {

}

module.exports = {
  create,
  update
}
